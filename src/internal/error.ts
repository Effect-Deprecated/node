export class ErrnoError {
  readonly _tag = "ErrnoError"
  constructor(readonly error: NodeJS.ErrnoException) {}
}
