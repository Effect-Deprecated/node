/**
 * ets_tracing: off
 */

import type * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as T from "@effect-ts/core/Effect"
import * as S from "@effect-ts/core/Effect/Experimental/Stream"
import * as Sink from "@effect-ts/core/Effect/Experimental/Stream/Sink"
import * as M from "@effect-ts/core/Effect/Managed"
import { pipe } from "@effect-ts/core/Function"
import type * as stream from "stream"

import * as Byte from "../../Byte"

export class ReadableError {
  readonly _tag = "ReadableError"
  constructor(readonly error: Error) {}
}

/**
 * Captures a Node `Readable`, converting it into a `Stream`. The size
 *
 * Note: your Readable should not have an encoding set in order to work with buffers,
 * calling this with a Readable with an encoding set will `Die`.
 */
export function streamFromReadable(
  r: () => stream.Readable,
  bufferSize: number = S.DEFAULT_CHUNK_SIZE
): S.Stream<unknown, ReadableError, Byte.Byte> {
  return pipe(
    T.succeedWith(r),
    T.tap((sr) =>
      sr.readableEncoding != null
        ? T.dieMessage(
            `stream.Readable encoding set to ${sr.readableEncoding} cannot be used to produce Buffer`
          )
        : T.unit
    ),
    S.acquireReleaseWith((sr) =>
      T.succeedWith(() => {
        sr.destroy()
      })
    ),
    S.chain((sr) =>
      S.async<unknown, ReadableError, Byte.Byte>((emit) => {
        sr.on("readable", () => {
          let buffer: Buffer | null = null

          while ((buffer = sr.read(bufferSize)) !== null) {
            emit.chunk(Byte.chunk(buffer))
          }
        })
        sr.on("end", () => {
          emit.end()
        })
        sr.on("error", (err) => {
          emit.fail(new ReadableError(err))
        })
      })
    )
  )
}

export class WritableError {
  readonly _tag = "WritableError"
  constructor(readonly error: Error) {}
}

/**
 * Uses the provided NodeJS `Writable` stream to create a `Sink` that consumes
 * byte chunks and writes them to the `Writable` stream. The sink will yield
 * the count of bytes written.
 *
 * The `Writable` stream will be automatically closed after the stream is
 * finished or an error occurred.
 */
export function sinkFromWritable(w: () => stream.Writable) {
  return Sink.unwrapManaged(
    pipe(
      T.succeedWith(w),
      M.makeExit((sw) =>
        T.succeedWith(() => {
          sw.destroy()
        })
      ),
      M.map((sw) =>
        Sink.foldLeftChunksEffect(0, (bytesWritten, byteChunk: C.Chunk<Byte.Byte>) =>
          T.effectAsync<unknown, WritableError, number>((resume) => {
            sw.write(Byte.buffer(byteChunk), (err) => {
              if (err) {
                resume(T.fail(new WritableError(err)))
              } else {
                resume(T.succeed(bytesWritten + byteChunk.length))
              }
            })
          })
        )
      )
    )
  )
}

export class TransformError {
  readonly _tag = "TransformError"
  constructor(readonly error: Error) {}
}

/**
 * A sink that collects all of its inputs into a `Buffer`.
 */
export function collectBuffer<E>(): Sink.Sink<
  unknown,
  E,
  Byte.Byte,
  E,
  unknown,
  Buffer
> {
  return Sink.map_(Sink.collectAll<E, Byte.Byte>(), Byte.buffer)
}

/**
 * Runs the stream and collects all of its elements to a buffer.
 */
export function runBuffer<R, E>(
  self: S.Stream<R, E, Byte.Byte>
): T.Effect<R, E, Buffer> {
  return S.run_(self, collectBuffer())
}
