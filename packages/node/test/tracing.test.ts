import "@effect-ts/tracing-utils/Enable"

import * as T from "@effect-ts/core/Effect"
import * as C from "@effect-ts/core/Effect/Cause"
import * as Ex from "@effect-ts/core/Effect/Exit"
import { pipe } from "@effect-ts/core/Function"

describe("Tracing & Optimizations", () => {
  it("should collect traces", async () => {
    const res = await pipe(
      T.succeed(1),
      T.chain((n) => {
        return T.succeed(n + 1)
      }),
      T.chain((n) => {
        return T.succeed(n + 1)
      }),
      T.chain((n) => {
        return T.succeed(n + 1)
      }),
      T.tap((n) => {
        return T.fail(`(${n})`)
      }),
      T.catchAll(function handle(n) {
        return T.succeed(n)
      }),
      T.chain((n) => {
        return T.fail(`error: ${n}`)
      }),
      T.chain(() => T.succeed(0)),
      T.result,
      T.runPromise
    )

    Ex.assertsFailure(res)

    console.log(
      C.pretty(res.cause, {
        renderError: C.defaultRenderer.renderError,
        renderUnknown: C.defaultRenderer.renderUnknown,
        renderTrace: C.defaultRenderer.renderTrace
      })
    )

    expect(C.untraced(res.cause)).toEqual(C.fail("error: (4)"))
  })

  it("should collect 2", async () => {
    const res = await pipe(
      T.succeed("ok"),
      T.tap(() => T.unit),
      T.tap(() => T.unit),
      T.tap(() => T.unit),
      T.map((x) => `(${x})`),
      T.chain((n) => T.fail(`error: ${n}`)),
      T.runPromiseExit
    )

    Ex.assertsFailure(res)

    console.log(
      C.pretty(res.cause, {
        renderError: C.defaultRenderer.renderError,
        renderUnknown: C.defaultRenderer.renderUnknown,
        renderTrace: C.defaultRenderer.renderTrace
      })
    )
  })
})
