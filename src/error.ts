export class ErrnoError {
  readonly _tag = "ErrnoError"
  constructor(readonly error: NodeJS.ErrnoException, readonly method: string, readonly path?: unknown) {}
}
