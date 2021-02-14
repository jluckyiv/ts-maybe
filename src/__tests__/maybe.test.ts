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

test('Maybe.map2 with ints', () => {
    const m1 = Just(1)
    const m2 = Just(2)
    const add = (n1: number) => (n2: number) => n1 + n2;
    const actual = Maybe.map2(add)(m1)(m2)
    expect(actual).toStrictEqual(Just(3))
})

test('Maybe.map2 with second Nothing', () => {
    const m1 = Just(1)
    const m2 = Nothing
    const add = (n1: number) => (n2: number) => n1 + n2;
    const actual = Maybe.map2(add)(m1)(m2)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map2 with first Nothing', () => {
    const m1 = Nothing
    const m2 = Just(1)
    const add = (n1: number) => (n2: number) => n1 + n2;
    const actual = Maybe.map2(add)(m1)(m2)
    expect(actual).toStrictEqual(Nothing)
})