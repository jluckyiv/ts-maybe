import { Maybe, Just, Nothing } from "../maybe"

const toUpper = (s: string) => s.toUpperCase()
const toString1 = (n: number) => n.toString()
const toString2 = (n1: number) => (n2: number) => n1.toString() + n2.toString();
const add1 = (n: number) => n + 1
const add2 = (n1: number) => (n2: number) => n1 + n2;
const add3 = (n1: number) => (n2: number) => (n3: number) => n1 + n2 + n3;
const add4 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => n1 + n2 + n3 + n4;
const add5 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => (n5: number) => n1 + n2 + n3 + n4 + n5;

test('Maybe.withDefault', () => {
    const maybe = Just(1)
    const actual = Maybe.withDefault(0)(maybe)
    expect(actual).toBe(1);
})

test('Maybe.map with Nothing', () => {
    const maybe = Nothing
    const actual = Maybe.map(toUpper)(maybe)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map with int', () => {
    const maybe = Just(1)
    const actual = Maybe.map(add1)(maybe)
    expect(actual).toStrictEqual(Just(2))
})

test('Maybe.map with string', () => {
    const maybe = Just("hello")
    const actual = Maybe.map(toUpper)(maybe)
    expect(actual).toStrictEqual(Just("HELLO"))
})

test('Maybe.map int to string', () => {
    const maybe = Just(1)
    const actual = Maybe.map(toString1)(maybe)
    expect(actual).toStrictEqual(Just("1"))
})

test('Maybe.map2 with first Nothing', () => {
    const m1 = Nothing, m2 = Just(1)
    const actual = Maybe.map2(add2)(m1)(m2)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map2 with second Nothing', () => {
    const m1 = Just(1), m2 = Nothing
    const actual = Maybe.map2(add2)(m1)(m2)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map2 with ints', () => {
    const m1 = Just(1), m2 = Just(2)
    const actual = Maybe.map2(add2)(m1)(m2)
    expect(actual).toStrictEqual(Just(3))
})

test('Maybe.map2 int to string', () => {
    const m1 = Just(1), m2 = Just(2)
    const actual = Maybe.map2(toString2)(m1)(m2)
    expect(actual).toStrictEqual(Just("12"))
})

test('Maybe.map3 with first Nothing', () => {
    const m1 = Nothing, m2 = Just(2), m3 = Just(3)
    const actual = Maybe.map3(add3)(m1)(m2)(m3)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map3 with second Nothing', () => {
    const m1 = Just(1), m2 = Nothing, m3 = Just(3)
    const actual = Maybe.map3(add3)(m1)(m2)(m3)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map3 with third Nothing', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Nothing
    const actual = Maybe.map3(add3)(m1)(m2)(m3)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map3 with ints', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3)
    const actual = Maybe.map3(add3)(m1)(m2)(m3)
    expect(actual).toStrictEqual(Just(6))
})