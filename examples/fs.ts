import * as Fs from "@effect/node/internal/fs"
import { pipe } from "@fp-ts/core/Function"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Cause from "@effect/io/Cause"
import * as Stream from "@effect/stream/Stream"

const program = pipe(Fs.stream(process.argv[2]), Stream.run(Fs.sink(process.argv[3])))

Effect.runCallback(program, (exit) => {
  if (Exit.isFailure(exit)) {
    console.error(Cause.pretty(exit.cause))
  }
})
