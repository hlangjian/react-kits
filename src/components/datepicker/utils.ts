import { CompositeProps, composite } from "@/utils/composite/common"
import { Locale } from "date-fns"
import { createContext } from "react"

const orderInWeek = (day: number, startDay: Day) => (day + 7 - startDay) % 7

const oneDay = 24 * 60 * 60 * 1000

export const createCalendar = (monthDate: Date, startDay: Day = 0, compact = true) => {
    const firstDateInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth())
    const firstDateInCalendar = firstDateInMonth.getTime() - orderInWeek(firstDateInMonth.getDay(), startDay) * oneDay

    if (compact === false) {
        return {
            dates: [...Array(42).keys()].map(key => new Date(firstDateInCalendar + key * oneDay)),
            month: firstDateInMonth
        }
    }

    const firstDateNextMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1)
    const lastDateInCalendar = firstDateNextMonth.getDay() === startDay ?
        firstDateNextMonth.getTime() - oneDay
        : firstDateNextMonth.getTime() + (7 - orderInWeek(firstDateNextMonth.getDay(), startDay)) * oneDay
    const days = (lastDateInCalendar - firstDateInCalendar) / oneDay

    return {
        dates: [...Array(days).keys()].map(key => new Date(firstDateInCalendar + key * oneDay)),
        month: firstDateInMonth
    }
}

const doNothing = () => { }

export const singleMode = composite(({ store, compute }) => {
    const selected = store<number | null>(null)
    const nouse = store(null)

    return {
        useDateButton: (props: { date: number }) => {
            const { date } = props
            const active = compute(() => selected.get() === date, [selected])
            const between = compute(() => false, [nouse, nouse])
            const onClick = () => selected.set(date)

            return {
                active, between,
                onClick, onMouseOver: doNothing
            }
        },
        useDateValue: () => {
            const selectedValue = compute(() => selected.get() ? [selected.get()!] : [], [selected])
            return selectedValue
        }
    }
})

export const multiMode = composite(({ store, compute }) => {
    const selected = store<Record<number, any>>({})
    const nouse = store(null)

    return {
        useDateButton: (props: { date: number }) => {
            const { date } = props
            const active = compute(() => date in selected.get(), [selected])
            const between = compute(() => false, [nouse, nouse])
            const onClick = () => {
                if (date in selected.get()) delete selected.get()[date]
                else selected.get()[date] = null
                selected.refresh()
            }

            return {
                active, between,
                onClick, onMouseOver: doNothing
            }
        },
        useDateValue: () => {
            const selectedValue = compute(() => Object.keys(selected).map(e => Number(e)), [selected])
            return selectedValue
        }
    }
})

export const rangeMode = composite(({ store, compute }) => {
    const selected = store<number[]>([])
    const hovering = store<number>(0)

    return {
        useDateButton: (props: { date: number }) => {
            const { date } = props
            const active = compute(() => selected.get().includes(date), [selected])

            const between = compute(() => {
                const [min, max] = (selected.get().length === 1 ?
                    [selected.get()[0], hovering.get()]
                    : selected.get()).filter(v => v !== 0).sort()
                return date > min && date < max
            }, [selected, hovering])

            const onClick = () => {
                if (selected.get().length >= 2) selected.set([date])
                else {
                    selected.set([...selected.get(), date])
                }
                hovering.set(0)
            }

            const onMouseOver = () => {
                if (selected.get().length === 1) {
                    hovering.set(date)
                }
            }
            return { active, between, onClick, onMouseOver }
        },
        useDateValue: () => {
            const range = compute(() => selected.get().sort(), [selected])
            return range
        }
    }
})

export const datePickerMode = (props: { mode: 'single' | 'multi' | 'range' }) => ({ store, compute }: CompositeProps) => {

    const { mode } = props
    const selected = store<number[]>([])
    const hovering = store<number>(0)

    return {
        useDateButton: (props: { date: number }) => {
            const { date } = props

            const active = compute(() => {
                return selected.get().includes(date)
            }, [selected])

            const between = compute(() => {
                if (mode === 'range' && selected.get().length === 1) {
                    const [min, max] = [selected.get()[0], hovering.get()].sort()
                    return date > min && date < max
                }
                if (mode === 'range' && selected.get().length === 2) {
                    const [min, max] = [selected.get()[0], selected.get()[1]].sort()
                    return date > min && date < max
                }
                return false
            }, [selected, hovering])

            const onClick = () => {
                if (mode === 'single') selected.set([date])
                if (mode === 'multi') {
                    if (selected.get().includes(date)) {
                        selected.set(selected.get().filter(d => d !== date))
                    }
                    else {
                        selected.set([...selected.get(), date])
                    }
                }
                if (mode === 'range') {
                    if (selected.get().length >= 2) selected.set([date])
                    else {
                        selected.set([...selected.get(), date])
                    }
                    hovering.set(0)
                }
            }

            const onMouseOver = () => {
                if (mode === 'range' && selected.get().length === 1) {
                    hovering.set(date)
                }
            }
            return { active, between, onClick, onMouseOver }
        },
        useDateValue: () => {
            return compute(() => selected.get().sort(), [selected])
        }
    }
}

type DatePickerMode =
    { mode: 'single' | 'multi' | 'range' }
    & ReturnType<ReturnType<typeof datePickerMode>>

export const DatePickerContext = createContext<null |
    DatePickerMode & { locale: Locale, startDay: Day, compact: boolean }
>(null)

