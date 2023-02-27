import * as Duration from "@effect/data/Duration"
import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as RT from "@effect/node/Runtime"

pipe(Effect.fail("boom"), Effect.delay(Duration.minutes(1)), RT.runMain)
