import * as fs from "fs"
import * as path from "path"
import * as zlib from "zlib"

import * as Byte from "../src/Byte/index.js"
import * as NS from "../src/Stream/index.js"

describe("Node Stream", () => {
  it("build from readable", async () => {
    const res = await pipe(
      NS.streamFromReadable(() =>
        fs.createReadStream(path.join(__dirname, "fix/data.txt"))
      ),
      NS.runBuffer
    ).unsafeRunPromise()

    expect(res.toString("utf-8")).toEqual("a, b, c")
  })
  it("transform (gzip/gunzip)", async () => {
    const res = await pipe(
      NS.streamFromReadable(() =>
        fs.createReadStream(path.join(__dirname, "fix/data.txt"))
      ),
      NS.transform(zlib.createGzip),
      NS.runBuffer
    )
      .flatMap((x) =>
        pipe(
          Stream.fromChunk(Byte.chunk(x)),
          NS.transform(zlib.createGunzip),
          NS.runBuffer
        )
      )
      .unsafeRunPromise()

    expect(res.toString("utf-8")).toEqual("a, b, c")
  })
})
