import * as Effect from "@effect/io/Effect"
import * as _ from "@effect/node/Runtime"
import { mockProcessExit } from "vitest-mock-process"

describe("Runtime", () => {
  it("runMain exit", () => {
    const mockExit = mockProcessExit()
    _.runMain(Effect.succeed("hi world"))
    expect(mockExit).toHaveBeenCalledWith(0)
    mockExit.mockRestore()
  })
})
