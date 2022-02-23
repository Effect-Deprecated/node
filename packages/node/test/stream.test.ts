import * as T from "@effect-ts/core/Effect"
import * as S from "@effect-ts/core/Effect/Stream"
import { pipe } from "@effect-ts/core/Function"
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
      NS.runBuffer,
      T.runPromise
    )

    expect(res.toString("utf-8")).toEqual("a, b, c")
  })
  it("transform (gzip/gunzip)", async () => {
    const res = await pipe(
      NS.streamFromReadable(() =>
        fs.createReadStream(path.join(__dirname, "fix/data.txt"))
      ),
      NS.transform(zlib.createGzip),
      NS.runBuffer,
      T.chain((x) =>
        pipe(Byte.chunk(x), S.fromChunk, NS.transform(zlib.createGunzip), NS.runBuffer)
      ),
      T.runPromise
    )

    expect(res.toString("utf-8")).toEqual("a, b, c")
  })
})
