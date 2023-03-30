import type { LazyArg } from "@effect/data/Function"
import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Sink from "@effect/stream/Sink"
import * as Stream from "@effect/stream/Stream"
import type { Readable, Writable } from "node:stream"

export const DEFAULT_CHUNK_SIZE = 64 * 1024

export class ReadableError {
  readonly _tag = "ReadableError"
  constructor(readonly error: Error) {}
}

export class WritableError {
  readonly _tag = "WritableError"
  constructor(readonly error: Error) {}
}

export interface StreamOptions {
  chunkSize?: number
}

export type ReadableStream<A> = Stream.Stream<never, ReadableError, A>

export const stream = <A>(
  evaluate: LazyArg<Readable>,
  { chunkSize = DEFAULT_CHUNK_SIZE }: StreamOptions = {}
): ReadableStream<A> =>
  pipe(
    Effect.acquireRelease(Effect.sync(evaluate), (stream) =>
      Effect.sync(() => {
        stream.removeAllListeners()

        if (!stream.closed) {
          stream.destroy()
        }
      })),
    Effect.map((stream) =>
      Stream.async<never, ReadableError, Readable>((emit) => {
        stream.once("error", (err) => {
          emit.fail(new ReadableError(err))
        })

        stream.once("end", () => {
          emit.end()
        })

        stream.on("readable", () => {
          emit.single(stream)
        })

        if (stream.readable) {
          emit.single(stream)
        }
      }, 0)
    ),
    Stream.unwrapScoped,
    Stream.flatMap((_) => Stream.repeatEffectOption(readChunk<A>(_, chunkSize)))
  )

const readChunk = <A>(
  stream: Readable,
  size: number
): Effect.Effect<never, Option.Option<never>, A> =>
  pipe(
    Effect.sync(() => stream.read(size) as A | null),
    Effect.flatMap((a) => (a ? Effect.succeed(a) : Effect.fail(Option.none())))
  )

export interface SinkOptions {
  endOnExit?: boolean
  encoding?: BufferEncoding
}

export type WritableSink<A> = Sink.Sink<never, WritableError, A, never, void>

export const sink = <A>(
  evaluate: LazyArg<Writable>,
  { encoding, endOnExit = true }: SinkOptions = {}
): WritableSink<A> => endOnExit ? makeSinkWithRelease<A>(evaluate, encoding) : makeSink<A>(evaluate, encoding)

const makeSink = <A>(stream: LazyArg<Writable>, encoding?: BufferEncoding) =>
  pipe(
    Effect.sync(stream),
    Effect.map((_) => Sink.forEach(write<A>(_, encoding))),
    Sink.unwrap
  )

const makeSinkWithRelease = <A>(stream: LazyArg<Writable>, encoding?: BufferEncoding) =>
  pipe(
    Effect.acquireRelease(Effect.sync(stream), endWritable),
    Effect.map((_) => Sink.forEach(write<A>(_, encoding))),
    Sink.unwrapScoped
  )

const endWritable = (stream: Writable) =>
  Effect.async<never, never, void>((resume) => {
    if (stream.closed) {
      resume(Effect.unit())
      return
    }

    stream.end(() => resume(Effect.unit()))
  })

const write = <A>(stream: Writable, encoding?: BufferEncoding) =>
  (_: A) =>
    Effect.async<never, WritableError, void>((resume) => {
      const cb = (err?: Error | null) => {
        if (err) {
          resume(Effect.fail(new WritableError(err)))
        } else {
          resume(Effect.unit())
        }
      }

      if (encoding) {
        stream.write(_, encoding, cb)
      } else {
        stream.write(_, cb)
      }
    })
