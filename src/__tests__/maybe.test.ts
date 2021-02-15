import { just, nothing } from "../maybe"

const toUpper = (s: string) => s.toUpperCase();
const toString1 = (n: number) => n.toString();
const toString2 = (n1: number) => (n2: number) => n1.toString() + n2.toString();
const toString3 = (n1: number) => (n2: number) => (n3: number) => n1.toString() + n2.toString() + n3.toString();
const toString4 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => n1.toString() + n2.toString() + n3.toString() + n4.toString();
const toString5 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => (n5: number) => n1.toString() + n2.toString() + n3.toString() + n4.toString() + n5.toString();
const concat3 = (s1: string) => (s2: string) => (s3: string) => s1 + s2 + s3;
const concat4 = (s1: string) => (s2: string) => (s3: string) => (s4: string) => s1 + s2 + s3 + s4;
const concat5 = (s1: string) => (s2: string) => (s3: string) => (s4: string) => (s5: string) => s1 + s2 + s3 + s4 + s5;
const add1 = (n: number) => n + 1;
const add2 = (n1: number) => (n2: number) => n1 + n2;
const add3 = (n1: number) => (n2: number) => (n3: number) => n1 + n2 + n3;
const add4 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => n1 + n2 + n3 + n4;
const add5 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => (n5: number) => n1 + n2 + n3 + n4 + n5;
const toInt = (s: string) => {
    const i = parseInt(s)
    return isNaN(i) ? nothing() : just(i)
}

test('Maybe.withDefault', () => {
    const maybe = just(1)
    const actual = maybe.withDefault(0)
    expect(actual).toBe(1);
})

test('Maybe.map with int', () => {
    const maybe = just(1)
    const actual = maybe.map(add1).withDefault(0)
    expect(actual).toBe(2)
})

test('Maybe.map with string', () => {
    const maybe = just("hello")
    const actual = maybe.map(toUpper).withDefault("")
    expect(actual).toEqual("HELLO")
})

test('Maybe.map int to string', () => {
    const maybe = just(1)
    const actual = maybe.map(toString1).withDefault("")
    expect(actual).toEqual("1")
})

test('Maybe.map with Nothing', () => {
    const maybe = nothing()
    const actual = maybe.map(toUpper)
    expect(actual).toStrictEqual(nothing())
})

const toValidMonth = (n: number) => n < 1 || n > 12 ? nothing() : just(n)

test('Maybe.andThen with Just', () => {
    const maybe = toInt("1")
    const actual = maybe.andThen(toValidMonth)
    expect(actual).toStrictEqual(just(1))
})

test('Maybe class withDefault', () => {
    const maybe = just(1);
    const actual = maybe.withDefault(2)
    expect(actual).toEqual(1)
})

test('Maybe chain map', () => {
    const maybe = just(1);
    const actual = maybe.map(add1)
    expect(actual).toMatchObject(just(2))
})

test('Maybe chain map chain', () => {
    const maybe = just(1);
    const actual = maybe.map(add1).map(add1).map(add1).map(add1)
    expect(actual).toMatchObject(just(5))
})

test('Maybe chain andThen successful', () => {
    const actual = just("1").andThen(toInt).andThen(toValidMonth)
    expect(actual).toMatchObject(just(1))
})

test('Maybe chain andThen with Nothing', () => {
    const actual = just("one").andThen(toInt).andThen(toValidMonth)
    expect(actual).toMatchObject(nothing())
})

test('Maybe chain andThen with Just -> Nothing', () => {
    const actual = just("13").andThen(toInt).andThen(toValidMonth)
    expect(actual).toMatchObject(nothing())
})

test('Maybe chain map andThen', () => {
    const actual = just(1).map(add1).map(add1).map(toString1).andThen(toInt).andThen(toValidMonth)
    expect(actual).toMatchObject(just(3))
})
/*
test('Maybe.andThen with initial Nothing', () => {
    const maybe = toInt("a")
    const actual = Maybe.andThen(toValidMonth)(maybe)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.andThen with applied Nothing', () => {
    const maybe = toInt("13")
    const actual = Maybe.andThen(toValidMonth)(maybe)
    expect(actual).toStrictEqual(Nothing)
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

test('Maybe.map3 with strings', () => {
    const m1 = Just("first"), m2 = Just("second"), m3 = Just("third")
    const actual = Maybe.map3(concat3)(m1)(m2)(m3)
    expect(actual).toStrictEqual(Just("firstsecondthird"))
})

test('Maybe.map3 int to string', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3)
    const actual = Maybe.map3(toString3)(m1)(m2)(m3)
    expect(actual).toStrictEqual(Just("123"))
})

test('Maybe.map4 with first Nothing', () => {
    const m1 = Nothing, m2 = Just(2), m3 = Just(3), m4 = Just(4)
    const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map4 with second Nothing', () => {
    const m1 = Just(1), m2 = Nothing, m3 = Just(3), m4 = Just(4)
    const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map4 with third Nothing', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Nothing, m4 = Just(4)
    const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map4 with fourth Nothing', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3), m4 = Nothing
    const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map4 with ints', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3), m4 = Just(4)
    const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Just(10))
})

test('Maybe.map4 with strings', () => {
    const m1 = Just("first"), m2 = Just("second"), m3 = Just("third"), m4 = Just("fourth")
    const actual = Maybe.map4(concat4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Just("firstsecondthirdfourth"))
})

test('Maybe.map4 int to string', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3), m4 = Just(4)
    const actual = Maybe.map4(toString4)(m1)(m2)(m3)(m4)
    expect(actual).toStrictEqual(Just("1234"))
})

test('Maybe.map5 with Nothing', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3), m4 = Just(4), m5 = Nothing
    const actual = Maybe.map5(add5)(m1)(m2)(m3)(m4)(m5)
    expect(actual).toStrictEqual(Nothing)
})

test('Maybe.map5 with ints', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3), m4 = Just(4), m5 = Just(5)
    const actual = Maybe.map5(add5)(m1)(m2)(m3)(m4)(m5)
    expect(actual).toStrictEqual(Just(15))
})

test('Maybe.map5 with strings', () => {
    const m1 = Just("first"), m2 = Just("second"), m3 = Just("third"), m4 = Just("fourth"), m5 = Just("fifth")
    const actual = Maybe.map5(concat5)(m1)(m2)(m3)(m4)(m5)
    expect(actual).toStrictEqual(Just("firstsecondthirdfourthfifth"))
})

test('Maybe.map5 int to string', () => {
    const m1 = Just(1), m2 = Just(2), m3 = Just(3), m4 = Just(4), m5 = Just(5)
    const actual = Maybe.map5(toString5)(m1)(m2)(m3)(m4)(m5)
    expect(actual).toStrictEqual(Just("12345"))
})

*/