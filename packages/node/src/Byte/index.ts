// ets_tracing: off

import type { Brand } from "@tsplus/runtime/Brand"

export type Byte = number & Brand<"Byte">

/**
 * @ets_optimize identity
 */
export function byte(n: number): Byte {
  return n as any
}

export function chunk(buf: Buffer): Chunk<Byte> {
  return Chunk.from(buf) as any
}

export function buffer(buf: Chunk<Byte>): Buffer {
  return buf.toArrayLike as any
}
