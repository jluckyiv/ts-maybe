interface Just<T> { kind: "Just"; value: T };
interface Nothing { kind: "Nothing" };
type Maybe<T> = Just<T> | Nothing

export const Just = <T>(value: T): Just<T> => {
    return { kind: "Just", value };
}

export const Nothing = (): Nothing => {
    return { kind: "Nothing" };
}

export const withDefault = <T>(defaultValue: T) => (maybe: Maybe<T>) => {
    switch (maybe.kind) {
        case "Just": return maybe.value
        case "Nothing": return defaultValue
        default:
            const _: never = maybe
            return _
    }
}

export const Maybe = {
    withDefault: withDefault,
    Just: Just,
    Nothing: Nothing
}

export default Maybe

/*
export function fromLeft<L, R, DV>(value: Left<L>, defaultValue: DV): Left<L>;
export function fromLeft<L, R, DV>(value: Right<R>, defaultValue: DV): DV;
export function fromLeft<L, R, DV>(value: Either<L, R>, defaultValue: DV): Left<L> | DV;
export function fromLeft<L, R, DV>(value: Either<L, R>, defaultValue: DV) {
    return isLeft(value) ? value.left : defaultValue;
}

export function fromRight<L, R, DV>(value: Right<R>, defaultValue: DV): Right<R>;
export function fromRight<L, R, DV>(value: Left<L>, defaultValue: DV): DV;
export function fromRight<L, R, DV>(value: Either<L, R>, defaultValue: DV): Right<R> | DV;
export function fromRight<L, R, DV>(value: Either<L, R>, defaultValue: DV) {
    return isRight(value) ? value.right : defaultValue;
}
*/