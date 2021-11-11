import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import * as path from "path"

import * as FS from "../src/FileSystem"

describe("FS", () => {
  it("test file system access to files", () =>
    pipe(
      T.gen(function* (_) {
        const filePath = path.join(process.cwd(), "./log.txt")

        const exists = yield* _(FS.fileExists(filePath))

        expect(exists).toBeFalsy()
      }),
      T.provideSomeLayer(FS.LiveFS),
      T.runPromise
    ))
})
