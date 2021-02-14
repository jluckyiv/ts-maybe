interface Just<T> { kind: "Just"; value: T };
interface Nothing { kind: "Nothing" };
type Maybe<T> = Just<T> | Nothing

const just = <T>(value: T): Just<T> => {
    return { kind: "Just", value };
}
export const Just = just

const nothing = (): Nothing => {
    return { kind: "Nothing" };
}
export const Nothing = nothing()

export const withDefault = <T>(defaultValue: T) => (maybe: Maybe<T>): T => {
    switch (maybe.kind) {
        case "Just": return maybe.value
        case "Nothing": return defaultValue
        default:
            const _: never = maybe
            return _
    }
}

export const map = <A, B>(fun: (arg: A) => B) => (maybe: Maybe<A>): Maybe<B> => {
    switch (maybe.kind) {
        case "Just": return Just(fun(maybe.value))
        case "Nothing": return Nothing
        default:
            const _: never = maybe
            return _
    }
}

export const map2 = <A, B, C>(fun: (arg1: A) => (arg2: B) => C) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>): Maybe<C> => {
    if (maybeA.kind == "Just" && maybeB.kind == "Just") {
        return Just(fun(maybeA.value)(maybeB.value))
    } else {
        return Nothing
    }
}

export const map3 = <A, B, C, D>(fun: (arg1: A) => (arg2: B) => (arg3: C) => D) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>) => (maybeC: Maybe<C>): Maybe<D> => {
    if (maybeA.kind == "Just" && maybeB.kind == "Just" && maybeC.kind == "Just") {
        return Just(fun(maybeA.value)(maybeB.value)(maybeC.value))
    } else {
        return Nothing
    }
}

export const map4 = <A, B, C, D, E>(fun: (arg1: A) => (arg2: B) => (arg3: C) => (arg4: D) => E) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>) => (maybeC: Maybe<C>) => (maybeD: Maybe<D>): Maybe<E> => {
    if (maybeA.kind == "Just" && maybeB.kind == "Just" && maybeC.kind == "Just" && maybeD.kind == "Just") {
        return Just(fun(maybeA.value)(maybeB.value)(maybeC.value)(maybeD.value))
    } else {
        return Nothing
    }
}

export const map5 = <A, B, C, D, E, F>(fun: (arg1: A) => (arg2: B) => (arg3: C) => (arg4: D) => (arg5: E) => F) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>) => (maybeC: Maybe<C>) => (maybeD: Maybe<D>) => (maybeE: Maybe<E>): Maybe<F> => {
    if (maybeA.kind == "Just" && maybeB.kind == "Just" && maybeC.kind == "Just" && maybeD.kind == "Just" && maybeE.kind == "Just") {
        return Just(fun(maybeA.value)(maybeB.value)(maybeC.value)(maybeD.value)(maybeE.value))
    } else {
        return Nothing
    }
}

export const andThen = <A, B>(fun: (arg: A) => Maybe<B>) => (maybe: Maybe<A>): Maybe<B> => {
    switch (maybe.kind) {
        case "Just": return fun(maybe.value)
        case "Nothing": return Nothing
        default:
            const _: never = maybe
            return _
    }
}

export const Maybe = {
    withDefault: withDefault,
    Just: Just,
    Nothing: Nothing,
    map: map,
    map2: map2,
    map3: map3,
    map4: map4,
    map5: map5,
    andThen: andThen,
}

export default Maybe
