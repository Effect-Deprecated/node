// ets_tracing: off

import type * as stream from "stream"

import * as Byte from "../Byte/index.js"

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
): Stream<never, ReadableError, Byte.Byte> {
  return pipe(
    Effect.succeedWith(r).tap((sr) =>
      sr.readableEncoding != null
        ? Effect.dieMessage(
            `stream.Readable encoding set to ${sr.readableEncoding} cannot be used to produce Buffer`
          )
        : Effect.unit
    ),
    Stream.bracket((sr) =>
      Effect.succeedWith(() => {
        sr.destroy()
      })
    ),
    Stream.$.flatMap((sr) =>
      Stream.async<never, ReadableError, Byte.Byte>((cb) => {
        sr.on("data", (data) => {
          cb(Effect.succeed(Byte.chunk(data)))
        })
        sr.on("end", () => {
          cb(Effect.fail(Maybe.none))
        })
        sr.on("error", (err) => {
          cb(Effect.fail(Maybe.some(new ReadableError(err))))
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
): Sink<never, WritableError, Byte.Byte, never, void> {
  return new Sink(
    pipe(
      Effect.succeedWith(w),
      M.makeExit((sw) =>
        Effect.succeedWith(() => {
          sw.destroy()
        })
      ),
      M.map(
        (sw) => (o: Maybe<Chunk<Byte.Byte>>) =>
          Maybe.isNone(o)
            ? Push.emit(undefined, Chunk.empty())
            : Effect.async((cb) => {
                sw.write(Byte.buffer(o.value), (err) => {
                  if (err) {
                    cb(Push.fail(new WritableError(err), Chunk.empty()))
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
): <R, E>(stream: Stream<R, E, Byte.Byte>) => Stream<R, E | TransformError, Byte.Byte> {
  return <R, E>(stream: Stream<R, E, Byte.Byte>) => {
    const managedSink = pipe(
      Effect.succeedWith(tr),
      M.makeExit((st) =>
        Effect.succeedWith(() => {
          st.destroy()
        })
      ),
      M.map((st) =>
        Tuple(
          st,
          Sink.fromPush<never, TransformError, Byte.Byte, never, void>((_) =>
            _.fold(
              () =>
                Effect.succeedWith(() => {
                  st.end()
                }).flatMap(() => Push.emit(undefined, Chunk.empty())),
              (chunk) =>
                Effect.effectAsync((cb) => {
                  st.write(Byte.buffer(chunk), (err) =>
                    err
                      ? cb(Push.fail(new TransformError(err), Chunk.empty()))
                      : cb(Push.more)
                  )
                })
            )
          )
        )
      )
    )
    return Stream.managed(managedSink).flatMap(({ tuple: [st, sink] }) =>
      Stream.asyncEffect<never, TransformError, Byte.Byte, R, E | TransformError>(
        (cb) =>
          Effect.succeedWith(() => {
            st.on("data", (chunk) => {
              cb(Effect.succeed(Byte.chunk(chunk)))
            })
            st.on("error", (err) => {
              cb(Effect.fail(Maybe.some(new TransformError(err))))
            })
            st.on("end", () => {
              cb(Effect.fail(Maybe.none))
            })
          }).zipRight(Stream.run_(stream, sink))
      )
    )
  }
}

/**
 * A sink that collects all of its inputs into an array.
 */
export function collectBuffer(): Sink<never, never, Byte.Byte, never, Buffer> {
  return Sink.reduceLeftChunks(Chunk.empty<Byte.Byte>())((s, i: Chunk<Byte.Byte>) =>
    s.concat(i)
  ).map(Byte.buffer)
}

/**
 * Runs the stream and collects all of its elements to a buffer.
 */
export function runBuffer<R, E>(self: Stream<R, E, Byte.Byte>): Effect<R, E, Buffer> {
  return Stream.run_(self, collectBuffer())
}
