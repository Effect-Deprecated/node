import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import * as T from "@effect-ts/core/Effect"
import * as S from "@effect-ts/core/Effect/Experimental/Stream"
import * as Ref from "@effect-ts/core/Effect/Ref"
import { pipe } from "@effect-ts/core/Function"
import * as fs from "fs"
import * as path from "path"
import * as stream from "stream"

// import * as zlib from "zlib"
import * as Byte from "../src/Byte"
import * as NS from "../src/Stream"

describe("Node Stream", () => {
  it("should build an Effect-TS Stream from a NodeJS stream.Readable", async () => {
    const res = await pipe(
      NS.streamFromReadable(() =>
        fs.createReadStream(path.join(__dirname, "fix/data.txt"))
      ),
      NS.runBuffer,
      T.runPromise
    )

    expect(res.toString("utf-8")).toEqual("a, b, c")
  })

  it("should build an Effect-TS Sink from a NodeJS stream.Writable", async () => {
    const mockStream = new stream.PassThrough()
    let output: C.Chunk<Byte.Byte> = C.empty()

    mockStream.on("data", (chunk) => {
      output = C.concat_(output, Byte.chunk(chunk))
    })

    const res = await pipe(
      T.do,
      T.bind("bytesWritten", () =>
        pipe(
          Ref.makeRef(0),
          T.map((ref) =>
            S.repeatEffect(T.delay(10)(Ref.updateAndGet_(ref, (n) => n + 1)))
          ),
          S.unwrap,
          S.take(5),
          S.map(Byte.byte),
          S.run(NS.sinkFromWritable(() => mockStream))
        )
      ),
      T.runPromise
    )

    expect(res.bytesWritten).toEqual(5)
    expect(C.toArray(output)).toEqual([1, 2, 3, 4, 5])
  })
  // it("transform (gzip/gunzip)", async () => {
  //   const res = await pipe(
  //     NS.streamFromReadable(() =>
  //       fs.createReadStream(path.join(__dirname, "fix/data.txt"))
  //     ),
  //     NS.transform(zlib.createGzip),
  //     NS.runBuffer,
  //     T.chain((x) =>
  //       pipe(S.fromChunk(Byte.chunk(x)), NS.transform(zlib.createGunzip), NS.runBuffer)
  //     ),
  //     T.runPromise
  //   )

  //   expect(res.toString("utf-8")).toEqual("a, b, c")
  // })
})
