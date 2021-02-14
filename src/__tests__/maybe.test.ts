import { Maybe, Just, Nothing } from "../maybe"

test('Maybe.withDefault', () => {
    const m = Just(1)
    expect(Maybe.withDefault(0)(m)).toBe(1);
})
