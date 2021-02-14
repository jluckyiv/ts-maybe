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

export const map = <T>(fun: (arg: T) => T) => (maybe: Maybe<T>): Maybe<T> => {
    switch (maybe.kind) {
        case "Just": return Just(fun(maybe.value))
        case "Nothing": return Nothing
        default:
            const _: never = maybe
            return _
    }
}

export const map2 = <T>(fun: (arg1: T) => (arg2: T) => T) => (maybe1: Maybe<T>) => (maybe2: Maybe<T>): Maybe<T> => {
    if (maybe1.kind == "Just" && maybe2.kind == "Just") {
        return Just(fun(maybe1.value)(maybe2.value))
    } else {
        return Nothing
    }
}

export const Maybe = {
    withDefault: withDefault,
    map: map,
    map2: map2,
    Just: Just,
    Nothing: Nothing
}

export default Maybe
