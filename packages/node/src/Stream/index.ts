import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as T from "@effect-ts/core/Effect"
import * as M from "@effect-ts/core/Effect/Managed"
import * as S from "@effect-ts/core/Effect/Stream"
import * as Push from "@effect-ts/core/Effect/Stream/Push"
import * as Sink from "@effect-ts/core/Effect/Stream/Sink"
import { pipe, tuple } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"
import type * as stream from "stream"

import * as Byte from "../Byte"

export class ReadableError {
  readonly _tag = "ReadableError"
  constructor(readonly error: Error) {}
}

/**
 * Captures a Node `Readable`, converting it into a `Stream`,
 *
 * Note: your Readable should not have an encoding set in order to work with buffers,
 * calling this with a Readable with an encoding setted with `Die`.
 */
export function streamFromReadable(
  r: () => stream.Readable
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
    S.bracket((sr) =>
      T.succeedWith(() => {
        sr.destroy()
      })
    ),
    S.chain((sr) =>
      S.effectAsync<unknown, ReadableError, Byte.Byte>((cb) => {
        sr.on("data", (data) => {
          cb(T.succeed(Byte.chunk(data)))
        })
        sr.on("end", () => {
          cb(T.fail(O.none))
        })
        sr.on("error", (err) => {
          cb(T.fail(O.some(new ReadableError(err))))
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
 * Captures a Node `Writable`, converting it into a `Sink`
 */
export function sinkFromWritable(
  w: () => stream.Writable
): Sink.Sink<unknown, WritableError, Byte.Byte, never, void> {
  return new Sink.Sink(
    pipe(
      T.succeedWith(w),
      M.makeExit((sw) =>
        T.succeedWith(() => {
          sw.destroy()
        })
      ),
      M.map((sw) => (o: O.Option<C.Chunk<Byte.Byte>>) =>
        O.isNone(o)
          ? Push.emit(undefined, C.empty())
          : T.effectAsync((cb) => {
              sw.write(Byte.buffer(o.value), (err) => {
                if (err) {
                  cb(Push.fail(new WritableError(err), C.empty()))
                } else {
                  cb(Push.more)
                }
              })
            })
      )
    )
  )
}

export class TransformError {
  readonly _tag = "TransformError"
  constructor(readonly error: Error) {}
}

/**
 * Captures a Node `Transform` for use with `Stream`
 */
export function transform(
  tr: () => stream.Transform
): <R, E>(
  stream: S.Stream<R, E, Byte.Byte>
) => S.Stream<R, E | TransformError, Byte.Byte> {
  return <R, E>(stream: S.Stream<R, E, Byte.Byte>) => {
    const managedSink = pipe(
      T.succeedWith(tr),
      M.makeExit((st) =>
        T.succeedWith(() => {
          st.destroy()
        })
      ),
      M.map((st) =>
        tuple(
          st,
          Sink.fromPush<unknown, TransformError, Byte.Byte, never, void>(
            O.fold(
              () =>
                T.chain_(
                  T.succeedWith(() => {
                    st.end()
                  }),
                  () => Push.emit(undefined, C.empty())
                ),
              (chunk) =>
                T.effectAsync((cb) => {
                  st.write(Byte.buffer(chunk), (err) =>
                    err
                      ? cb(Push.fail(new TransformError(err), C.empty()))
                      : cb(Push.more)
                  )
                })
            )
          )
        )
      )
    )
    return pipe(
      S.managed(managedSink),
      S.chain(([st, sink]) =>
        S.effectAsyncM<unknown, TransformError, Byte.Byte, R, E | TransformError>(
          (cb) =>
            T.zipRight_(
              T.succeedWith(() => {
                st.on("data", (chunk) => {
                  cb(T.succeed(Byte.chunk(chunk)))
                })
                st.on("error", (err) => {
                  cb(T.fail(O.some(new TransformError(err))))
                })
                st.on("end", () => {
                  cb(T.fail(O.none))
                })
              }),
              S.run_(stream, sink)
            )
        )
      )
    )
  }
}

/**
 * A sink that collects all of its inputs into an array.
 */
export function collectBuffer(): Sink.Sink<unknown, never, Byte.Byte, never, Buffer> {
  return Sink.map_(
    Sink.reduceLeftChunks(C.empty<Byte.Byte>())((s, i: C.Chunk<Byte.Byte>) =>
      C.concat_(s, i)
    ),
    Byte.buffer
  )
}

/**
 * Runs the stream and collects all of its elements to a buffer.
 */
export function runBuffer<R, E>(
  self: S.Stream<R, E, Byte.Byte>
): T.Effect<R, E, Buffer> {
  return S.run_(self, collectBuffer())
}
