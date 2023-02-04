import * as Cause from "@effect/io/Cause"
import * as Chunk from "@fp-ts/data/Chunk"
import * as Option from "@fp-ts/core/Option"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import { pipe } from "@fp-ts/core/Function"

export class NodeProcessExit {
  readonly _tag = "NodeProcessExit"
  constructor(readonly code: number) {}
}

export const exit = (code: number) => Effect.fail(new NodeProcessExit(code))

const handleExit = <E, A>(exit: Exit.Exit<E | NodeProcessExit, A>) => {
  if (Exit.isSuccess(exit)) {
    process.exit(0)
  } else if (Exit.isInterrupted(exit)) {
    process.exit(0)
  } else {
    const exitCode = pipe(
      Cause.failures(exit.cause),
      Chunk.findFirst(
        (_): _ is NodeProcessExit =>
          typeof _ === "object" &&
          _ !== null &&
          "_tag" in _ &&
          _._tag === "NodeProcessExit"
      ),
      Option.match(
        () => 1,
        (_) => _.code
      )
    )
    process.exit(exitCode)
  }
}

export const runMain = <E, A>(effect: Effect.Effect<never, E | NodeProcessExit, A>) => {
  const interrupt = Effect.runCallback(effect, handleExit)

  function onSigint() {
    process.removeListener("SIGINT", onSigint)
    process.removeListener("SIGTERM", onSigint)
    interrupt()
  }

  process.once("SIGINT", onSigint)
  process.once("SIGTERM", onSigint)
}
