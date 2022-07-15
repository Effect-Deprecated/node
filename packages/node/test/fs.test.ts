import * as path from "path"

import * as FS from "../src/FileSystem/index.js"

describe("FS", () => {
  it("test file system access to files", () =>
    Effect.gen(function* (_) {
      const filePath = path.join(process.cwd(), "./log.txt")

      const exists = yield* _(FS.fileExists(filePath))

      expect(exists).toBeFalsy()
    })
      .provideSomeLayer(FS.LiveFS)
      .unsafeRunPromise())
})
