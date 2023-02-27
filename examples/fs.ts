import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import { LiveNodeFs, NodeFs } from "@effect/node/Fs"
import { runMain } from "@effect/node/Runtime"
import * as Stream from "@effect/stream/Stream"

const program = Effect.gen(function*($) {
  const fs = yield* $(Effect.service(NodeFs))

  yield* $(
    pipe(fs.stream(process.argv[2]), Stream.run(fs.sink(process.argv[3])))
  )
})

pipe(
  Effect.provideLayer(program, LiveNodeFs),
  Effect.catchAllCause(Effect.logErrorCause),
  runMain
)
