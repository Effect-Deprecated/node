import * as Cause from "@effect/io/Cause"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import type * as FiberId from "@effect/io/Fiber/Id"

export const defaultTeardown = <E, A>(
  exit: Exit.Exit<E, A>,
  onExit: (code: number) => void
) => {
  onExit(Exit.isFailure(exit) && !Cause.isInterruptedOnly(exit.cause) ? 1 : 0)
}

/**
 * @since 1.0.0
 */
export const runMain = <E, A>(
  effect: Effect.Effect<never, E, A>,
  teardown = defaultTeardown
) => {
  const fiber = Effect.runFork(effect)

  fiber.unsafeAddObserver((exit) =>
    teardown(exit, (code) =>
      Effect.runCallback(interruptAll(fiber.id()), () => {
        process.exit(code)
      }))
  )

  function onSigint() {
    process.removeListener("SIGINT", onSigint)
    process.removeListener("SIGTERM", onSigint)

    Effect.runCallback(fiber.interruptAsFork(fiber.id()))
  }

  process.once("SIGINT", onSigint)
  process.once("SIGTERM", onSigint)
}

const interruptAll = (id: FiberId.FiberId) =>
  Effect.flatMap(Fiber.roots(), (roots) => {
    if (roots.length === 0) {
      return Effect.unit()
    }

    return Fiber.interruptAllWith(roots, id)
  })
