import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import { LazyArg, pipe } from "@fp-ts/data/Function"
import * as Net from "net"
import type { ReadableStream, WritableSink } from "./stream"
import * as S from "./stream"

export class ServerError {
  readonly _tag = "ServerError"
  constructor(readonly error: Error) {}
}

export type ServerHandler<R, E> = (
  stream: ReadableStream<Buffer>,
  sink: WritableSink<Uint8Array>
) => Effect.Effect<R, E, void>

export const serve =
  <R, E>(handle: ServerHandler<R, E>) =>
  (
    make: LazyArg<Net.Server>,
    options: Net.ListenOptions & { port: number }
  ): Effect.Effect<R, ServerError | E, void> =>
    pipe(
      Effect.acquireRelease(Effect.sync(make), (server) =>
        Effect.async<never, never, void>((resume) => {
          server.removeAllListeners()
          server.close(() => resume(Effect.unit()))
        })
      ),
      Effect.flatMap(setupServer(handle, options)),
      Effect.scoped
    )

const setupServer =
  <R, E>(handle: ServerHandler<R, E>, options: Net.ListenOptions) =>
  (server: Net.Server) =>
    pipe(
      Effect.runtime<R>(),
      Effect.flatMap((rt) =>
        Effect.async<never, ServerError | E, void>((resume) => {
          server.once("error", (_) => resume(Effect.fail(new ServerError(_))))

          server.on("connection", (socket) => {
            const stream = S.stream<Buffer>(() => socket)
            const sink = S.sink<Uint8Array>(() => socket)

            rt.unsafeRun(handle(stream, sink), (exit) => {
              if (Exit.isFailure(exit)) {
                resume(Effect.failCause(exit.cause))
              }
            })
          })

          server.listen(options)
        })
      )
    )
