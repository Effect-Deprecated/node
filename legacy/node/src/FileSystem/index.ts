// ets_tracing: off

import { Tagged } from "@effect-ts/core/Case"
import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import { pipe } from "@effect-ts/core/Function"
import type { Flat } from "@effect-ts/core/Has"
import { tag } from "@effect-ts/core/Has"
import type { _A } from "@effect-ts/system/Utils"
import * as fs from "fs"

export const tagName = <K extends string>(k: K) =>
  `@effect-ts/node/FileSystem/${k}` as const

export const FSError = <K extends string>(k: K) => Tagged(tagName(k))

export class WriteFileError extends FSError("WriteFileError")<{
  readonly error: NodeJS.ErrnoException
  readonly file: fs.PathOrFileDescriptor
  readonly data: string | NodeJS.ArrayBufferView
  readonly options: WriteFileOptions
}> {}

export class ReadFileError extends FSError("ReadFileError")<{
  readonly error: NodeJS.ErrnoException
  readonly path: fs.PathOrFileDescriptor
  readonly flag: string | undefined
}> {}

export class StatError extends FSError("StatError")<{
  readonly error: NodeJS.ErrnoException
  readonly path: fs.PathLike
}> {}

export class AccessError extends FSError("AccessError")<{
  readonly error: NodeJS.ErrnoException
  readonly path: fs.PathLike
  readonly mode: number | undefined
}> {}

export class RmError extends FSError("RmError")<{
  readonly error: NodeJS.ErrnoException
  readonly path: fs.PathLike
  readonly options: fs.RmOptions | undefined
}> {}

export class RmDirError extends FSError("RmDirError")<{
  readonly error: NodeJS.ErrnoException
  readonly path: fs.PathLike
  readonly options: fs.RmDirOptions | undefined
}> {}

export class FileExistsError extends FSError("FileExistsError")<{
  readonly error: AccessError
}> {}

export const FSSymbol = Symbol.for(tagName("FSSymbol"))

export interface WriteFileOptions
  extends Flat<
    fs.ObjectEncodingOptions & {
      mode?: fs.Mode | undefined
      flag?: string | undefined
    }
  > {}

export const makeLiveFS = T.succeedWith(() => {
  const writeFile = (
    file: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    options: WriteFileOptions
  ) =>
    T.effectAsyncInterrupt<unknown, WriteFileError, void>((resume) => {
      const controller = new AbortController()
      fs.writeFile(file, data, { ...options, signal: controller.signal }, (error) => {
        if (error) {
          resume(T.fail(new WriteFileError({ error, file, data, options })))
        } else {
          resume(T.unit)
        }
      })
      return T.succeedWith(() => {
        controller.abort()
      })
    })

  const readFile = (path: fs.PathOrFileDescriptor, flag?: string) =>
    T.effectAsyncInterrupt<unknown, ReadFileError, Buffer>((resume) => {
      const controller = new AbortController()
      fs.readFile(
        path,
        { signal: controller.signal, flag },
        (error: NodeJS.ErrnoException | null, data: Buffer) => {
          if (error) {
            resume(T.fail(new ReadFileError({ error, path, flag })))
          } else {
            resume(T.succeed(data))
          }
        }
      )
      return T.succeedWith(() => {
        controller.abort()
      })
    })

  const rm = (path: fs.PathLike, options?: fs.RmOptions) =>
    T.effectAsync<unknown, RmError, void>((resume) => {
      fs.rm(path, options ?? {}, (error) => {
        if (error) {
          resume(T.fail(new RmError({ error, path, options })))
        } else {
          resume(T.unit)
        }
      })
    })

  const rmDir = (path: fs.PathLike, options?: fs.RmDirOptions) =>
    T.effectAsync<unknown, RmDirError, void>((resume) => {
      fs.rmdir(path, options ?? {}, (error) => {
        if (error) {
          resume(T.fail(new RmDirError({ error, path, options })))
        } else {
          resume(T.unit)
        }
      })
    })

  const stat = (path: fs.PathLike) =>
    T.effectAsync<unknown, StatError, fs.Stats>((resume) => {
      fs.stat(path, (error, stats) => {
        if (error) {
          resume(T.fail(new StatError({ error, path })))
        } else {
          resume(T.succeed(stats))
        }
      })
    })

  const access = (path: fs.PathLike, mode?: number) =>
    T.effectAsync<unknown, AccessError, void>((resume) => {
      fs.access(path, mode, (error) => {
        if (error) {
          resume(T.fail(new AccessError({ error, path, mode })))
        } else {
          resume(T.unit)
        }
      })
    })

  const fileExists = (path: fs.PathLike) =>
    pipe(
      access(path, fs.constants.F_OK),
      T.fold(
        () => false,
        () => true
      )
    )

  return {
    serviceId: FSSymbol,
    writeFile,
    readFile,
    stat,
    access,
    fileExists,
    rm,
    rmDir
  } as const
})

export interface FS extends _A<typeof makeLiveFS> {}

export const FS = tag<FS>(FSSymbol)

export const { access, fileExists, readFile, rm, rmDir, stat, writeFile } =
  T.deriveLifted(FS)(
    ["writeFile", "readFile", "stat", "access", "fileExists", "rm", "rmDir"],
    [],
    []
  )

export const LiveFS = L.fromEffect(FS)(makeLiveFS)
