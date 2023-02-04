import * as RT from "@effect/node/internal/runtime"
import * as Effect from "@effect/io/Effect"
import { pipe } from "@fp-ts/core/Function"
import * as Duration from "@fp-ts/data/Duration"

pipe(Effect.fail("boom"), Effect.delay(Duration.minutes(1)), RT.runMain)