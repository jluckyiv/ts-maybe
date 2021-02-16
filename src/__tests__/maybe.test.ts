import { Maybe, just, nothing } from "../maybe";

describe("Maybe", () => {
  describe("Maybe.of", () => {
    describe("truthy values return just(value)", () => {
      test("Maybe.of(1) is just(1)", () => {
        const actual = Maybe.of(1);
        expect(actual).toStrictEqual(just(1));
      });
    });

    describe("falsy values", () => {
      describe("undefined and null are nothing", () => {
        test("Maybe.of(undefined) is nothing", () => {
          const actual = Maybe.of(undefined);
          expect(actual).toStrictEqual(nothing);
        });

        test("Maybe.of(null) is nothing", () => {
          const actual = Maybe.of(null);
          expect(actual).toStrictEqual(nothing);
        });
      });

      describe("other falsy values are just(value)", () => {
        test("Maybe.of(false) is just(false)", () => {
          const actual = Maybe.of(false);
          expect(actual).toStrictEqual(just(false));
        });

        test("Maybe.of(0) is just(0)", () => {
          const actual = Maybe.of(0);
          expect(actual).toStrictEqual(just(0));
        });

        test("Maybe.of(-0) is just(-0)", () => {
          const actual = Maybe.of(-0);
          expect(actual).toStrictEqual(just(-0));
        });

        test("Maybe.of('') is just('')", () => {
          const actual = Maybe.of("");
          expect(actual).toStrictEqual(just(""));
        });

        test("Maybe.of(NaN) is just(NaN)", () => {
          const actual = Maybe.of(NaN);
          expect(actual).toStrictEqual(just(NaN));
        });
      });
    });
  });

  describe("Maybe.withDefault", () => {
    describe("as function", () => {
      test("with nothing returns default", () => {
        const actual = Maybe.withDefault(0)(nothing);
        expect(actual).toBe(0);
      });

      test("with just(value) returns value", () => {
        const actual = Maybe.withDefault(0)(just(1));
        expect(actual).toBe(1);
      });
    });

    describe("as method", () => {
      test("with nothing returns default", () => {
        const actual = nothing.withDefault(0);
        expect(actual).toBe(0);
      });

      test("with just(value) returns value", () => {
        const actual = just(1).withDefault(0);
        expect(actual).toBe(1);
      });
    });
  });

  describe("Maybe.map", () => {
    const toString = (n: number) => n.toString();
    const add1 = (n: number) => n + 1;

    describe("as function", () => {
      test("with nothing return nothing", () => {
        const actual = Maybe.map(toString)(nothing);
        expect(actual).toStrictEqual(nothing);
      });

      test("with just(value) applies function", () => {
        const actual = Maybe.map(toString)(just(1));
        expect(actual).toEqual(just("1"));
      });
    });

    describe("as method", () => {
      test("with nothing returns nothing", () => {
        const actual = nothing.map(toString);
        expect(actual).toStrictEqual(nothing);
      });

      test("with just(value) applies function", () => {
        const actual = just(1).map(toString);
        expect(actual).toEqual(just("1"));
      });

      test("can chain mapped functions", () => {
        const actual = just(1)
          .map(add1)
          .map(add1)
          .map(add1)
          .map(add1)
          .map(toString);
        expect(actual).toStrictEqual(just("5"));
      });
    });
  });

  describe("Maybe.andThen", () => {
    const toString = (n: number) => n.toString();
    const add1 = (n: number) => n + 1;
    const toValidMonth = (n: number) => (n < 1 || n > 12 ? nothing : just(n));
    const toInt = (s: string) =>
      isNaN(parseInt(s)) ? nothing : just(parseInt(s));

    describe("as function", () => {
      test("with nothing returns nothing", () => {
        const actual = Maybe.andThen(toValidMonth)(nothing);
        expect(actual).toStrictEqual(nothing);
      });

      test("with just(value) applies function", () => {
        const actual = Maybe.andThen(toValidMonth)(toInt("1"));
        expect(actual).toStrictEqual(just(1));
      });
    });

    describe("as method", () => {
      test("with nothing early", () => {
        const actual = nothing.andThen(toInt).andThen(toValidMonth);
        expect(actual).toStrictEqual(nothing);
      });

      test("with nothing late", () => {
        const actual = just("13").andThen(toInt).andThen(toValidMonth);
        expect(actual).toStrictEqual(nothing);
      });

      test("can chain andThen", () => {
        const actual = just("1").andThen(toInt).andThen(toValidMonth);
        expect(actual).toStrictEqual(just(1));
      });

      test("can chain with map", () => {
        const actual = just(1)
          .map(add1)
          .map(toString)
          .andThen(toInt)
          .map(add1)
          .andThen(toValidMonth);
        expect(actual).toStrictEqual(just(3));
      });
    });
  });

  describe("Maybe.map2", () => {
    const toString2 = (n1: number) => (n2: number) =>
      n1.toString() + n2.toString();

    test("with nothing first", () => {
      const actual = Maybe.map2(toString2)(nothing)(just(2));
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing second", () => {
      const actual = Maybe.map2(toString2)(just(1))(nothing);
      expect(actual).toStrictEqual(nothing);
    });

    test("with valid input", () => {
      const actual = Maybe.map2(toString2)(just(1))(just(2));
      expect(actual).toStrictEqual(just("12"));
    });
  });

  describe("Maybe.map3", () => {
    const toString3 = (n1: number) => (n2: number) => (n3: number) =>
      n1.toString() + n2.toString() + n3.toString();
    test("with nothing first", () => {
      const actual = Maybe.map3(toString3)(nothing)(just(2))(just(3));
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing second", () => {
      const actual = Maybe.map3(toString3)(just(1))(nothing)(just(3));
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing third", () => {
      const actual = Maybe.map3(toString3)(just(1))(just(2))(nothing);
      expect(actual).toStrictEqual(nothing);
    });

    test("with valid input", () => {
      const actual = Maybe.map3(toString3)(just(1))(just(2))(just(3));
      expect(actual).toStrictEqual(just("123"));
    });
  });

  describe("Maybe.map4", () => {
    const toString4 = (n1: number) => (n2: number) => (n3: number) => (
      n4: number
    ) => n1.toString() + n2.toString() + n3.toString() + n4.toString();

    test("with nothing first", () => {
      const actual = Maybe.map4(toString4)(nothing)(just(1))(just(1))(just(1));
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing second", () => {
      const actual = Maybe.map4(toString4)(just(1))(nothing)(just(1))(just(1));
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing third", () => {
      const actual = Maybe.map4(toString4)(just(1))(just(1))(nothing)(just(1));
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing fourth", () => {
      const actual = Maybe.map4(toString4)(just(1))(just(1))(just(1))(nothing);
      expect(actual).toStrictEqual(nothing);
    });

    test("with valid input", () => {
      const actual = Maybe.map4(toString4)(just(1))(just(2))(just(3))(just(4));
      expect(actual).toStrictEqual(just("1234"));
    });
  });

  describe("Maybe.map5", () => {
    const toString5 = (n1: number) => (n2: number) => (n3: number) => (
      n4: number
    ) => (n5: number) =>
      n1.toString() +
      n2.toString() +
      n3.toString() +
      n4.toString() +
      n5.toString();

    test("with nothing first", () => {
      const actual = Maybe.map5(toString5)(nothing)(just(1))(just(1))(just(1))(
        just(1)
      );
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing second", () => {
      const actual = Maybe.map5(toString5)(just(1))(nothing)(just(1))(just(1))(
        just(1)
      );
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing third", () => {
      const actual = Maybe.map5(toString5)(just(1))(just(1))(nothing)(just(1))(
        just(1)
      );
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing fourth", () => {
      const actual = Maybe.map5(toString5)(just(1))(just(1))(just(1))(nothing)(
        just(1)
      );
      expect(actual).toStrictEqual(nothing);
    });

    test("with nothing fifth", () => {
      const actual = Maybe.map5(toString5)(just(1))(just(1))(just(1))(just(1))(
        nothing
      );
      expect(actual).toStrictEqual(nothing);
    });

    test("with valid input", () => {
      const actual = Maybe.map5(toString5)(just(1))(just(2))(just(3))(just(4))(
        just(5)
      );
      expect(actual).toStrictEqual(just("12345"));
    });
  });
});
