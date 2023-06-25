import { createContext, useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { StoreType, store } from "./common"

export const computeReact = <T>(
    equation: (value?: T) => T, peeks?: StoreType<any>[]
) => {
    const [value, setValue] = useState(equation())

    useEffect(() => {
        const subscriber = () => setValue(equation())
        if (peeks) peeks.forEach(peek => peek.subscribe(subscriber))
        return () => {
            if (peeks) peeks.forEach(peek => peek.unsubscribe(subscriber))
        }
    }, peeks ? peeks : [])

    return value
}

type CompositeProps = {
    store: <T>(initial: T) => StoreType<T>,
    compute: <T>(
        equation: (value?: T) => T, peeks?: StoreType<any>[]
    ) => T
}

export const useComposite = <T extends object>(factory: (props: CompositeProps) => T) => {
    const ret = factory({ store, compute: computeReact })
    return ret
}

export const toContext = <T extends object>(factory: (props: CompositeProps) => T) => {
    const props = useComposite(factory)
    const context = createContext(props)
    return context
}