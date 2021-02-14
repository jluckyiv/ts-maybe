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

export const Maybe = {
    withDefault: withDefault,
    map: map,
    map2: map2,
    map3: map3,
    Just: Just,
    Nothing: Nothing
}

export default Maybe
