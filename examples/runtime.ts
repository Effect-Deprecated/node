import * as Duration from "@effect/data/Duration"
import * as Effect from "@effect/io/Effect"
import * as RT from "@effect/node/Runtime"
import { pipe } from "@fp-ts/core/Function"

pipe(Effect.fail("boom"), Effect.delay(Duration.minutes(1)), RT.runMain)
