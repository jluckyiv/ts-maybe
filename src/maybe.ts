interface MaybeInterface<T> {
    withDefault: (defaultValue: T) => T;
    map: <A>(f: (arg: T) => A) => MaybeInterface<A>
    andThen: <A>(f: (arg: T) => MaybeInterface<A>) => MaybeInterface<A>
}

class Nothing implements MaybeInterface<any> {
    kind: "Nothing"

    private constructor() { }

    private static instance: Nothing
    static getInstance() {
        if (!Nothing.instance) { Nothing.instance = new Nothing() }
        return Nothing.instance
    }

    withDefault(defaultValue: any) {
        return defaultValue
    }
    map<A>(_: (_: any) => any) {
        return this
    }
    andThen<A>(_: (_: any) => any) {
        return this
    }
}

class Just<T> implements MaybeInterface<T> {
    kind: "Just";
    value: T;
    constructor(value: T) {
        this.value = value
    }
    withDefault(_: T) {
        return this.value
    }
    map<A>(f: (arg: T) => A) {
        return new Just(f(this.value))
    }
    andThen<A>(f: (arg: T) => MaybeInterface<A>) {
        return f(this.value)
    }

}

export const just = <T>(value: T) => new Just(value)
export const nothing = () => Nothing.getInstance()