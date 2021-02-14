import { Maybe, Just, Nothing } from "../maybe"

test('Maybe.withDefault', () => {
    const maybe = Just(1)
    const actual = Maybe.withDefault(0)(maybe)
    expect(actual).toBe(1);
})

test('Maybe.map with int', () => {
    const maybe = Just(1)
    const addOne = (n: number) => n + 1
    const actual = Maybe.map(addOne)(maybe)
    expect(actual).toStrictEqual(Just(2))
})

test('Maybe.map with string', () => {
    const maybe = Just("hello")
    const toUpper = (s: string) => s.toUpperCase()
    const actual = Maybe.map(toUpper)(maybe)
    expect(actual).toStrictEqual(Just("HELLO"))
})

test('Maybe.map with Nothing', () => {
    const maybe = Nothing
    const toUpper = (s: string) => s.toUpperCase()
    const actual = Maybe.map(toUpper)(maybe)
    expect(actual).toStrictEqual(Nothing)
})