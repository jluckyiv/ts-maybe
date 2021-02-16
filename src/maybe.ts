interface MaybeInterface<A> {
  kind: "Just" | "Nothing";
  withDefault: (defaultValue: A) => A;
  map: <B>(f: (arg: A) => B) => Maybe<B>;
  andThen: <B>(f: (arg: A) => Maybe<B>) => Maybe<B>;
}

const of = <A>(maybeValue: A): Maybe<A> => {
  if (maybeValue == null) {
    return nothing;
  } else {
    return just(maybeValue);
  }
};

const withDefault = <A>(defaultValue: A) => (maybeA: Maybe<A>): A => {
  switch (maybeA.kind) {
    case "Just":
      return maybeA.value;
    case "Nothing":
      return defaultValue;
  }
};

const map = <A, B>(f: (arg: A) => B) => (maybeA: Maybe<A>): Maybe<B> => {
  switch (maybeA.kind) {
    case "Just":
      return just(f(maybeA.value));
    case "Nothing":
      return nothing;
  }
};

const andThen = <A, B>(f: (arg: A) => Maybe<B>) => (
  maybeA: Maybe<A>
): Maybe<B> => {
  switch (maybeA.kind) {
    case "Just":
      return f(maybeA.value);
    case "Nothing":
      return nothing;
  }
};

const map2 = <A, B, C>(f: (argA: A) => (argB: B) => C) => (
  maybeA: Maybe<A>
) => (maybeB: Maybe<B>): Maybe<C> => {
  if (maybeA.kind === "Just" && maybeB.kind === "Just") {
    return just(f(maybeA.value)(maybeB.value));
  } else {
    return nothing;
  }
};

const map3 = <A, B, C, D>(f: (argA: A) => (argB: B) => (argC: C) => D) => (
  maybeA: Maybe<A>
) => (maybeB: Maybe<B>) => (maybeC: Maybe<C>): Maybe<D> => {
  if (
    maybeA.kind === "Just" &&
    maybeB.kind === "Just" &&
    maybeC.kind === "Just"
  ) {
    return just(f(maybeA.value)(maybeB.value)(maybeC.value));
  } else {
    return nothing;
  }
};

const map4 = <A, B, C, D, E>(
  f: (argA: A) => (argB: B) => (argC: C) => (argD: D) => E
) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>) => (maybeC: Maybe<C>) => (
  maybeD: Maybe<D>
): Maybe<E> => {
  if (
    maybeA.kind === "Just" &&
    maybeB.kind === "Just" &&
    maybeC.kind === "Just" &&
    maybeD.kind === "Just"
  ) {
    return just(f(maybeA.value)(maybeB.value)(maybeC.value)(maybeD.value));
  } else {
    return nothing;
  }
};

const map5 = <A, B, C, D, E, F>(
  f: (argA: A) => (argB: B) => (argC: C) => (argD: D) => (argE: E) => F
) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>) => (maybeC: Maybe<C>) => (
  maybeD: Maybe<D>
) => (maybeE: Maybe<E>): Maybe<F> => {
  if (
    maybeA.kind === "Just" &&
    maybeB.kind === "Just" &&
    maybeC.kind === "Just" &&
    maybeD.kind === "Just" &&
    maybeE.kind === "Just"
  ) {
    return just(
      f(maybeA.value)(maybeB.value)(maybeC.value)(maybeD.value)(maybeE.value)
    );
  } else {
    return nothing;
  }
};

class Just<A> implements MaybeInterface<A> {
  kind: "Just";
  value: A;

  constructor(value: A) {
    this.kind = "Just";
    this.value = value;
  }

  withDefault(defaultValue: A): A {
    return withDefault(defaultValue)(this);
  }

  map<B>(f: (arg: A) => B): Maybe<B> {
    return map(f)(this);
  }

  andThen<B>(f: (arg: A) => Maybe<B>): Maybe<B> {
    return andThen(f)(this);
  }
}

class Nothing implements MaybeInterface<any> {
  kind: "Nothing";

  private constructor() {
    this.kind = "Nothing";
  }
  private static instance: Nothing;
  static getInstance() {
    if (!Nothing.instance) {
      Nothing.instance = new Nothing();
    }
    return Nothing.instance;
  }

  withDefault(defaultValue: any) {
    return withDefault(defaultValue)(this);
  }

  map(f: (_: any) => any) {
    return map(f)(this);
  }

  andThen<B>(f: (_: any) => Maybe<B>): Maybe<B> {
    return andThen(f)(this);
  }
}

export type Maybe<T> = Just<T> | Nothing;
export const Maybe = {
  andThen: andThen,
  map2: map2,
  map3: map3,
  map4: map4,
  map5: map5,
  map: map,
  of: of,
  withDefault: withDefault,
};

export const just = <T>(value: T) => new Just(value);
export const nothing = Nothing.getInstance();
