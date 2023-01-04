// ets_tracing: off

import type * as B from "@effect-ts/core/Branded"
import * as Chunk from "@effect-ts/core/Collections/Immutable/Chunk"

export type Byte = B.Branded<number, "Byte">

/**
 * @ets_optimize identity
 */
export function byte(n: number): Byte {
  return n as any
}

export function chunk(buf: Buffer): Chunk.Chunk<Byte> {
  return Chunk.from(buf) as any
}

export function buffer(buf: Chunk.Chunk<Byte>): Buffer {
  return Chunk.toArrayLike(buf) as any
}
