import { Maybe, just, nothing } from "../maybe";

const toUpper = (s: string) => s.toUpperCase();
const toString1 = (n: number) => n.toString();
const toString2 = (n1: number) => (n2: number) => n1.toString() + n2.toString();
const toString3 = (n1: number) => (n2: number) => (n3: number) =>
  n1.toString() + n2.toString() + n3.toString();
const toString4 = (n1: number) => (n2: number) => (n3: number) => (
  n4: number
) => n1.toString() + n2.toString() + n3.toString() + n4.toString();
const toString5 = (n1: number) => (n2: number) => (n3: number) => (
  n4: number
) => (n5: number) =>
  n1.toString() + n2.toString() + n3.toString() + n4.toString() + n5.toString();
const concat2 = (s1: string) => (s2: string) => s1 + s2;
const concat3 = (s1: string) => (s2: string) => (s3: string) => s1 + s2 + s3;
const concat4 = (s1: string) => (s2: string) => (s3: string) => (s4: string) =>
  s1 + s2 + s3 + s4;
const concat5 = (s1: string) => (s2: string) => (s3: string) => (
  s4: string
) => (s5: string) => s1 + s2 + s3 + s4 + s5;
const add1 = (n: number) => n + 1;
const add2 = (n1: number) => (n2: number) => n1 + n2;
const add3 = (n1: number) => (n2: number) => (n3: number) => n1 + n2 + n3;
const add4 = (n1: number) => (n2: number) => (n3: number) => (n4: number) =>
  n1 + n2 + n3 + n4;
const add5 = (n1: number) => (n2: number) => (n3: number) => (n4: number) => (
  n5: number
) => n1 + n2 + n3 + n4 + n5;
const toInt = (s: string) => {
  const i = parseInt(s);
  return isNaN(i) ? nothing : just(i);
};

test("Maybe.withDefault", () => {
  const maybe = just(1);
  const actual = maybe.withDefault(0);
  expect(actual).toBe(1);
});

test("Maybe.map with int", () => {
  const maybe = just(1);
  const actual = maybe.map(add1).withDefault(0);
  expect(actual).toBe(2);
});

test("Maybe.map with string", () => {
  const maybe = just("hello");
  const actual = maybe.map(toUpper).withDefault("");
  expect(actual).toEqual("HELLO");
});

test("Maybe.map int to string", () => {
  const maybe = just(1);
  const actual = maybe.map(toString1).withDefault("");
  expect(actual).toEqual("1");
});

test("Maybe.map with Nothing", () => {
  const maybe = nothing;
  const actual = maybe.map(toUpper);
  expect(actual).toStrictEqual(nothing);
});

const toValidMonth = (n: number) => (n < 1 || n > 12 ? nothing : just(n));

test("Maybe.andThen with Just", () => {
  const maybe = toInt("1");
  const actual = maybe.andThen(toValidMonth);
  expect(actual).toStrictEqual(just(1));
});

test("Maybe class withDefault", () => {
  const maybe = just(1);
  const actual = maybe.withDefault(2);
  expect(actual).toEqual(1);
});

test("Maybe chain map", () => {
  const maybe = just(1);
  const actual = maybe.map(add1);
  expect(actual).toMatchObject(just(2));
});

test("Maybe chain map chain", () => {
  const maybe = just(1);
  const actual = maybe.map(add1).map(add1).map(add1).map(add1);
  expect(actual).toMatchObject(just(5));
});

test("Maybe chain andThen successful", () => {
  const actual = just("1").andThen(toInt).andThen(toValidMonth);
  expect(actual).toMatchObject(just(1));
});

test("Maybe chain andThen with Nothing", () => {
  const actual = just("one").andThen(toInt).andThen(toValidMonth);
  expect(actual).toMatchObject(nothing);
});

test("Maybe chain andThen with Just -> Nothing", () => {
  const actual = just("13").andThen(toInt).andThen(toValidMonth);
  expect(actual).toMatchObject(nothing);
});

test("Maybe chain map andThen", () => {
  const actual = just(1)
    .map(add1)
    .map(toString1)
    .andThen(toInt)
    .map(add1)
    .andThen(toValidMonth);
  expect(actual).toMatchObject(just(3));
});

test("Maybe.andThen with initial Nothing", () => {
  const maybe = toInt("a");
  const actual = maybe.andThen(toValidMonth);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.andThen with applied Nothing", () => {
  const maybe = toInt("13");
  const actual = maybe.andThen(toValidMonth);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map2 with ints", () => {
  const m1 = just(1),
    m2 = just(2);
  const actual = Maybe.map2(add2)(m2)(m1);
  expect(actual).toStrictEqual(just(3));
});

test("Maybe.map2 with second Nothing", () => {
  const m1 = just(1),
    m2 = nothing;
  const actual = Maybe.map2(add2)(m1)(m2);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map2 int to string", () => {
  const m1 = just(1),
    m2 = just(2);
  const actual = Maybe.map2(toString2)(m1)(m2);
  expect(actual).toStrictEqual(just("12"));
});

test("Maybe.map3 with first Nothing", () => {
  const m1 = nothing,
    m2 = just(2),
    m3 = just(3);
  const actual = Maybe.map3(add3)(m1)(m2)(m3);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map3 with second Nothing", () => {
  const m1 = just(1),
    m2 = nothing,
    m3 = just(3);
  const actual = Maybe.map3(add3)(m1)(m2)(m3);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map3 with third Nothing", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = nothing;
  const actual = Maybe.map3(add3)(m1)(m2)(m3);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map3 with ints", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3);
  const actual = Maybe.map3(add3)(m1)(m2)(m3);
  expect(actual).toStrictEqual(just(6));
});

test("Maybe.map3 with strings", () => {
  const m1 = just("first"),
    m2 = just("second"),
    m3 = just("third");
  const actual = Maybe.map3(concat3)(m1)(m2)(m3);
  expect(actual).toStrictEqual(just("firstsecondthird"));
});

test("Maybe.map3 int to string", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3);
  const actual = Maybe.map3(toString3)(m1)(m2)(m3);
  expect(actual).toStrictEqual(just("123"));
});

test("Maybe.map4 with first nothing", () => {
  const m1 = nothing,
    m2 = just(2),
    m3 = just(3),
    m4 = just(4);
  const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map4 with second nothing", () => {
  const m1 = just(1),
    m2 = nothing,
    m3 = just(3),
    m4 = just(4);
  const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map4 with third nothing", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = nothing,
    m4 = just(4);
  const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map4 with fourth nothing", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3),
    m4 = nothing;
  const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map4 with ints", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3),
    m4 = just(4);
  const actual = Maybe.map4(add4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(just(10));
});

test("Maybe.map4 with strings", () => {
  const m1 = just("first"),
    m2 = just("second"),
    m3 = just("third"),
    m4 = just("fourth");
  const actual = Maybe.map4(concat4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(just("firstsecondthirdfourth"));
});

test("Maybe.map4 int to string", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3),
    m4 = just(4);
  const actual = Maybe.map4(toString4)(m1)(m2)(m3)(m4);
  expect(actual).toStrictEqual(just("1234"));
});

test("Maybe.map5 with nothing", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3),
    m4 = just(4),
    m5 = nothing;
  const actual = Maybe.map5(add5)(m1)(m2)(m3)(m4)(m5);
  expect(actual).toStrictEqual(nothing);
});

test("Maybe.map5 with ints", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3),
    m4 = just(4),
    m5 = just(5);
  const actual = Maybe.map5(add5)(m1)(m2)(m3)(m4)(m5);
  expect(actual).toStrictEqual(just(15));
});

test("Maybe.map5 with strings", () => {
  const m1 = just("first"),
    m2 = just("second"),
    m3 = just("third"),
    m4 = just("fourth"),
    m5 = just("fifth");
  const actual = Maybe.map5(concat5)(m1)(m2)(m3)(m4)(m5);
  expect(actual).toStrictEqual(just("firstsecondthirdfourthfifth"));
});

test("Maybe.map5 int to string", () => {
  const m1 = just(1),
    m2 = just(2),
    m3 = just(3),
    m4 = just(4),
    m5 = just(5);
  const actual = Maybe.map5(toString5)(m1)(m2)(m3)(m4)(m5);
  expect(actual).toStrictEqual(just("12345"));
});
