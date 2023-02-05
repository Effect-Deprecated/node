import * as Cause from "@effect/io/Cause"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/Fiber/Id"
import { pipe } from "@fp-ts/core/Function"
import * as Option from "@fp-ts/core/Option"
import * as Chunk from "@fp-ts/data/Chunk"

export class NodeProcessExit {
  readonly _tag = "NodeProcessExit"
  constructor(readonly code: number) {}
}

export const exit = (code: number) => Effect.fail(new NodeProcessExit(code))

const handleExit = (id: FiberId.FiberId) => <E, A>(exit: Exit.Exit<E | NodeProcessExit, A>) => {
  if (Exit.isSuccess(exit)) {
    process.exit(0)
  } else if (Cause.isInterruptedOnly(exit.cause)) {
    process.exit(0)
  } else {
    const exitCode = pipe(
      Chunk.findFirst(
      Cause.failures(exit.cause),
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
  const fiber = Effect.runFork(effect)

  fiber.unsafeAddObserver(handleExit(fiber.id()))

  function onSigint() {
    process.removeListener("SIGINT", onSigint)
    process.removeListener("SIGTERM", onSigint)

    Effect.runFork(interruptAllAndExit(fiber.id(), 0))
  }

  process.once("SIGINT", onSigint)
  process.once("SIGTERM", onSigint)
}

const interruptAllAndExit = (id: FiberId.FiberId, code: number) =>
  Effect.flatMap(Fiber.roots(), (_) => Fiber.interruptAllWith(_, id))
