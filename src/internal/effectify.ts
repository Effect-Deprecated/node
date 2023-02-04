import * as Effect from "@effect/io/Effect"

interface Callback<E, A> {
  (err: E, a?: A): void
}

type ArgsWithCallback<Args extends any[], E, A> = [...args: Args, cb: Callback<E, A>]

type WithoutNull<A> = unknown extends A ? void : Exclude<A, null | undefined>

type Effectify<T, E> = T extends {
  (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
  (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
  (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
  (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
  (...args: ArgsWithCallback<infer Args5, any, infer A5>): any
  (...args: ArgsWithCallback<infer Args6, any, infer A6>): any
  (...args: ArgsWithCallback<infer Args7, any, infer A7>): any
  (...args: ArgsWithCallback<infer Args8, any, infer A8>): any
  (...args: ArgsWithCallback<infer Args9, any, infer A9>): any
  (...args: ArgsWithCallback<infer Args10, any, infer A10>): any
}
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
      (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
      (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
      (...args: Args7): Effect.Effect<never, E, WithoutNull<A7>>
      (...args: Args8): Effect.Effect<never, E, WithoutNull<A8>>
      (...args: Args9): Effect.Effect<never, E, WithoutNull<A9>>
      (...args: Args10): Effect.Effect<never, E, WithoutNull<A10>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
      (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
      (...args: ArgsWithCallback<infer Args5, any, infer A5>): any
      (...args: ArgsWithCallback<infer Args6, any, infer A6>): any
      (...args: ArgsWithCallback<infer Args7, any, infer A7>): any
      (...args: ArgsWithCallback<infer Args8, any, infer A8>): any
      (...args: ArgsWithCallback<infer Args9, any, infer A9>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
      (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
      (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
      (...args: Args7): Effect.Effect<never, E, WithoutNull<A7>>
      (...args: Args8): Effect.Effect<never, E, WithoutNull<A8>>
      (...args: Args9): Effect.Effect<never, E, WithoutNull<A9>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
      (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
      (...args: ArgsWithCallback<infer Args5, any, infer A5>): any
      (...args: ArgsWithCallback<infer Args6, any, infer A6>): any
      (...args: ArgsWithCallback<infer Args7, any, infer A7>): any
      (...args: ArgsWithCallback<infer Args8, any, infer A8>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
      (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
      (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
      (...args: Args7): Effect.Effect<never, E, WithoutNull<A7>>
      (...args: Args8): Effect.Effect<never, E, WithoutNull<A8>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
      (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
      (...args: ArgsWithCallback<infer Args5, any, infer A5>): any
      (...args: ArgsWithCallback<infer Args6, any, infer A6>): any
      (...args: ArgsWithCallback<infer Args7, any, infer A7>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
      (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
      (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
      (...args: Args7): Effect.Effect<never, E, WithoutNull<A7>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
      (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
      (...args: ArgsWithCallback<infer Args5, any, infer A5>): any
      (...args: ArgsWithCallback<infer Args6, any, infer A6>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
      (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
      (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
      (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
      (...args: ArgsWithCallback<infer Args5, any, infer A5>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
      (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
      (...args: ArgsWithCallback<infer Args4, any, infer A4>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
      (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
      (...args: ArgsWithCallback<infer Args3, any, infer A3>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
      (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
      (...args: ArgsWithCallback<infer Args2, any, infer A2>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
      (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
    }
  : T extends {
      (...args: ArgsWithCallback<infer Args1, any, infer A1>): any
    }
  ? {
      (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    }
  : never

type CallbackError<T> = T extends {
  (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E5, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E6, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E7, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E8, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E9, infer A>): any
  (...args: ArgsWithCallback<infer Args, infer E10, infer A>): any
}
  ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E5, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E6, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E7, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E8, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E9, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E5, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E6, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E7, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E8, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E5, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E6, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E7, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E5, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E6, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E5, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3 | E4 | E5>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E4, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3 | E4>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E3, infer A>): any
    }
  ? NonNullable<E1 | E2 | E3>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
      (...args: ArgsWithCallback<infer Args, infer E2, infer A>): any
    }
  ? NonNullable<E1 | E2>
  : T extends {
      (...args: ArgsWithCallback<infer Args, infer E1, infer A>): any
    }
  ? NonNullable<E1>
  : never

export const effectify: {
  <F extends (...args: any[]) => any>(fn: F): Effectify<F, CallbackError<F>>
  <F extends (...args: any[]) => any, E>(
    fn: F,
    onError: (error: CallbackError<F>) => E
  ): Effectify<F, E>
  <F extends (...args: any[]) => any, E, E2>(
    fn: F,
    onError: (error: CallbackError<F>) => E,
    onSyncError: (error: unknown) => E2
  ): Effectify<F, E | E2>
} = (<A>(fn: Function, onError?: (e: any) => any, onSyncError?: (e: any) => any) =>
  (...args: any[]) =>
    Effect.async<never, Error, A>((resume) => {
      try {
        fn(...args, (err: Error | null, result: A) => {
          if (err) {
            resume(Effect.fail(onError ? onError(err) : err))
          } else {
            resume(Effect.succeed(result))
          }
        })
      } catch (err) {
        resume(onSyncError ? Effect.fail(onSyncError(err)) : Effect.die(err))
      }
    })) as any
