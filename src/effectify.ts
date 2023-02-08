/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Effect from "@effect/io/Effect"

interface Callback<E, A> {
  (err: E, a?: A): void
}

type ArgsWithCallback<Args extends Array<any>, E, A> = [...args: Args, cb: Callback<E, A>]

type WithoutNull<A> = unknown extends A ? void : Exclude<A, null | undefined>

type Effectify<T, E> = T extends {
  (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
  (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
  (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
  (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
  (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
  (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
  (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
  (...args: ArgsWithCallback<infer Args8, infer E8, infer A8>): infer R8
  (...args: ArgsWithCallback<infer Args9, infer E9, infer A9>): infer R9
  (...args: ArgsWithCallback<infer Args10, infer E10, infer A10>): infer R10
} ? {
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
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
    (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
    (...args: ArgsWithCallback<infer Args8, infer E8, infer A8>): infer R8
    (...args: ArgsWithCallback<infer Args9, infer E9, infer A9>): infer R9
  } ? {
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
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
    (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
    (...args: ArgsWithCallback<infer Args8, infer E8, infer A8>): infer R8
  } ? {
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
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
    (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
    (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
    (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
    (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
    (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
    (...args: Args7): Effect.Effect<never, E, WithoutNull<A7>>
  }
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
    (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
    (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
    (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
    (...args: Args6): Effect.Effect<never, E, WithoutNull<A6>>
  }
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
    (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
    (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
    (...args: Args5): Effect.Effect<never, E, WithoutNull<A5>>
  }
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
    (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
    (...args: Args4): Effect.Effect<never, E, WithoutNull<A4>>
  }
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
    (...args: Args3): Effect.Effect<never, E, WithoutNull<A3>>
  }
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
    (...args: Args2): Effect.Effect<never, E, WithoutNull<A2>>
  }
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
  } ? {
    (...args: Args1): Effect.Effect<never, E, WithoutNull<A1>>
  }
  : never

type CallbackError<T> = T extends {
  (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
  (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
  (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
  (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
  (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
  (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
  (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
  (...args: ArgsWithCallback<infer Args8, infer E8, infer A8>): infer R8
  (...args: ArgsWithCallback<infer Args9, infer E9, infer A9>): infer R9
  (...args: ArgsWithCallback<infer Args10, infer E10, infer A10>): infer R10
} ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
    (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
    (...args: ArgsWithCallback<infer Args8, infer E8, infer A8>): infer R8
    (...args: ArgsWithCallback<infer Args9, infer E9, infer A9>): infer R9
  } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
    (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
    (...args: ArgsWithCallback<infer Args8, infer E8, infer A8>): infer R8
  } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
    (...args: ArgsWithCallback<infer Args7, infer E7, infer A7>): infer R7
  } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
    (...args: ArgsWithCallback<infer Args6, infer E6, infer A6>): infer R6
  } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
    (...args: ArgsWithCallback<infer Args5, infer E5, infer A5>): infer R5
  } ? NonNullable<E1 | E2 | E3 | E4 | E5>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
    (...args: ArgsWithCallback<infer Args4, infer E4, infer A4>): infer R4
  } ? NonNullable<E1 | E2 | E3 | E4>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
    (...args: ArgsWithCallback<infer Args3, infer E3, infer A3>): infer R3
  } ? NonNullable<E1 | E2 | E3>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
    (...args: ArgsWithCallback<infer Args2, infer E2, infer A2>): infer R2
  } ? NonNullable<E1 | E2>
  : T extends {
    (...args: ArgsWithCallback<infer Args1, infer E1, infer A1>): infer R1
  } ? NonNullable<E1>
  : never

export const effectify: {
  <F extends (...args: Array<any>) => any>(fn: F): Effectify<F, CallbackError<F>>
  <F extends (...args: Array<any>) => any, E>(
    fn: F,
    onError: (error: CallbackError<F>, args: Parameters<F>) => E
  ): Effectify<F, E>
  <F extends (...args: Array<any>) => any, E, E2>(
    fn: F,
    onError: (error: CallbackError<F>, args: Parameters<F>) => E,
    onSyncError: (error: unknown, args: Parameters<F>) => E2
  ): Effectify<F, E | E2>
} =
  (<A>(fn: Function, onError?: (e: any, args: any) => any, onSyncError?: (e: any, args: any) => any) =>
    (...args: Array<any>) =>
      Effect.async<never, Error, A>((resume) => {
        try {
          fn(...args, (err: Error | null, result: A) => {
            if (err) {
              resume(Effect.fail(onError ? onError(err, args) : err))
            } else {
              resume(Effect.succeed(result))
            }
          })
        } catch (err) {
          resume(onSyncError ? Effect.fail(onSyncError(err, args)) : Effect.die(err))
        }
      })) as any
