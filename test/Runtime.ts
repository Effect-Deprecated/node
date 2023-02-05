import * as Effect from "@effect/io/Effect"
import * as _ from "@effect/node/Runtime"
import * as it from "@effect/node/test/utils/extend"
import { mockProcessExit } from "vitest-mock-process"

describe("Runtime", () => {
  it.it("runMain exit", () => {
    const mockExit = mockProcessExit()
    _.runMain(Effect.succeed("hi world"))
    expect(mockExit).toHaveBeenCalledWith(0)
    mockExit.mockRestore()
  })
})
