import * as Layer from "@effect/io/Layer"
import * as internal from "@effect/node/internal/fs"
import { Tag } from "@fp-ts/data/Context"

export const {
  DEFAULT_CHUNK_SIZE,
  Fd,
  FsOpenError,
  FsReaddirError,
  FsStatError
} = internal

const make = () => ({
  open: internal.open,
  stat: internal.stat,
  readdir: internal.readdir,
  mkdir: internal.mkdir,
  readFile: internal.readFile,
  writeFile: internal.writeFile,
  copyFile: internal.copyFile,
  read: internal.read,
  allocAndRead: internal.allocAndRead,
  write: internal.write,
  writeAll: internal.writeAll,
  stream: internal.stream,
  sink: internal.sink
})

export interface NodeFs extends ReturnType<typeof make> {}
export const NodeFs = Tag<NodeFs>()
export const LiveNodeFs = Layer.succeed(NodeFs, make())
