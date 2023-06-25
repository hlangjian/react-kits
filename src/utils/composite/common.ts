export type StoreType<T> = {
    get: () => T,
    set: (value: T) => void,
    subscribe: (callback: () => void) => void,
    unsubscribe: (callback: () => void) => void,
    refresh: () => void
}
export const store = <T,>(initial: T) => {
    let value = initial
    let subscriber: Array<() => void> = []

    return {
        get: () => value,
        set: (newValue: T) => {
            value = newValue
            subscriber.forEach(callback => callback())
        },
        subscribe: (callback: () => void) => {
            if (subscriber.includes(callback) === false) {
                subscriber.push(callback)
            }
        },
        unsubscribe: (callback: () => void) => {
            subscriber = subscriber.filter(c => c !== callback)
        },
        refresh: () => {
            subscriber.forEach(callback => callback())
        }
    } as StoreType<T>
}

export type CompositeProps = {
    store: <T>(initial: T) => StoreType<T>,
    compute: <T>(
        equation: (value?: T) => T, peeks?: StoreType<any>[]
    ) => T
}

export const composite = <T>(factory: (props: CompositeProps) => T) => {
    return factory
}
