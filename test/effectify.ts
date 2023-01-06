import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Option from "@fp-ts/data/Option"
import * as Cause from "@effect/io/Cause"
import * as it from "@effect/node/test/utils/extend"
import { assert, describe } from "vitest"
import { effectify } from "@effect/node/effectify"
import { pipe } from "@fp-ts/data/Function"
import fs from "node:fs"

export class TestError {
  readonly _tag = "TestError"
  constructor(readonly error: NodeJS.ErrnoException) {}
}

export const readFile1 = effectify(fs.readFile)
export const readFile2 = effectify(fs.readFile, (e) => new TestError(e))

describe.concurrent("effectify (readFile)", () => {
  it.effect("handles happy path", () =>
    Effect.gen(function* ($) {
      const x = yield* $(readFile1(__filename))
      assert.match(x.toString(), /^import/)
    })
  )

  it.effect("preserves overloads", () =>
    Effect.gen(function* ($) {
      const x = yield* $(readFile1(__filename, "utf8"))
      assert.match(x.toString(), /^import/)
    })
  )

  it.effect("handles error path", () =>
    Effect.gen(function* ($) {
      const result = yield* $(
        pipe(
          readFile1(__filename + "!@#%$"),
          Effect.exit,
          Effect.map(
            Exit.match(
              (cause) =>
                pipe(
                  cause,
                  Cause.failureOption,
                  Option.map((x) => x.code)
                ),
              () => Option.none
            )
          )
        )
      )
      assert.deepStrictEqual(result, Option.some("ENOENT"))
    })
  )

  it.effect("handles error path (with error mapping)", () =>
    Effect.gen(function* ($) {
      const result = yield* $(
        pipe(
          readFile2(__filename + "!@#%$"),
          Effect.exit,
          Effect.map(
            Exit.match(
              (cause) =>
                pipe(
                  cause,
                  Cause.failureOption,
                  Option.map((x) => ({ tag: x._tag, code: x.error.code }))
                ),
              () => Option.none
            )
          )
        )
      )
      assert.deepStrictEqual(result, Option.some({ tag: "TestError", code: "ENOENT" }))
    })
  )
})
