import { useContext, useRef } from "react"
import { DatePickerContext, createCalendar, datePickerMode, multiMode, rangeMode, singleMode } from "./utils"
import { Locale, format } from "date-fns";
import { useComposite } from "@/utils/composite/react";
import { zhCN } from "date-fns/locale";
import { Input } from "../text-input/text-input";

export const DateButton = (props: { date: Date, inMonth: boolean }) => {
    const context = useContext(DatePickerContext)
    if (context === null) { console.error('You should use it in DatePicker context'); return };

    const { date, inMonth } = props
    const { useDateButton } = context
    const { active, between, onClick, onMouseOver } = useDateButton({ date: date.getTime() })

    return (
        <div
            data-active={active}
            data-between={between}
            data-disabled={!inMonth}
            onClick={onClick}
            onMouseOver={onMouseOver}
            className="date-btn"
        >
            {date.getDate()}
        </div>
    )
}

export const DayInWeek = (props: { day: Date }) => {
    const context = useContext(DatePickerContext)
    if (context === null) { console.error('You should use it in DatePicker context'); return };
    const { locale } = context

    return (
        <div className="flex h-8 w-8 items-center justify-center select-none text-sm text-neutral-500">
            {format(props.day, "eeeee", { locale })}
        </div>
    )
}

export const CalendarPage = (props: { monthDate: Date }) => {

    const context = useContext(DatePickerContext)
    if (context === null) { console.error('You should use it in DatePicker context'); return };

    const { monthDate } = props
    const { startDay, compact } = context
    const { dates } = createCalendar(monthDate, startDay, compact)
    const month = monthDate.getMonth()

    return (
        <div>
            <div className="grid grid-cols-7 gap-0.5 border-b mb-2">
                {dates.slice(0, 7).map((day, key) => <DayInWeek key={key} day={day} />)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {dates.map(date => <DateButton key={date.getTime()} date={date} inMonth={date.getMonth() === month} />)}
            </div>
        </div>
    )
}

export const DatePickerControl = (props: {
    placeholder?: string
    onClick?: () => void
}) => {

    const context = useContext(DatePickerContext)
    if (context === null) { console.error('You should use it in DatePicker context'); return };

    const { placeholder = "选择日期", onClick } = props
    const { useDateValue, mode } = context
    const values = useDateValue()

    let display = placeholder
    if (mode === 'single' && values.length > 0) {
        display = new Date(values[0]).toLocaleDateString()
    }
    if (mode === 'range' && values.length === 1) {
        display = new Date(values[0]).toLocaleDateString()
    }
    if (mode === 'range' && values.length > 1) {
        display = new Date(values[0]).toLocaleDateString() + ' => ' +
            new Date(values[1]).toLocaleDateString()
    }

    return (
        <input type="text" readOnly value={display} onClick={onClick} className="datepicker-control" />
    )
}

export const Calendar = (props: {
    pageCount?: number
    startMonth?: Date,
}) => {
    const { pageCount = 1, startMonth = new Date() } = props

    const year = startMonth.getFullYear()
    const month = startMonth.getMonth()

    return (
        <div className="inline-flex gap-4 rounded-md shadow border p-4 items-start justify-center">
            {[...Array(pageCount).keys()].map(key => <CalendarPage monthDate={new Date(year, month + key)} key={key} />)}
        </div>
    )
}

export const DatePicker = (props: {
    mode?: 'single' | 'multi' | 'range',
    locale?: Locale,
    startDay?: Day,
    startMonth?: Date,
    compact?: boolean,
    pageCount?: number
}) => {
    const ref = useRef<HTMLDivElement>(null)

    const {
        mode = 'single', locale = zhCN, startDay = 0,
        compact = true, pageCount = 1, startMonth = new Date()
    } = props
    const stateProps = useComposite(datePickerMode({ mode }))

    return (
        <DatePickerContext.Provider value={{ ...props, ...stateProps, locale, mode, startDay, compact }}>
            <div className="relative">
                <DatePickerControl onClick={() => {
                    ref.current?.classList.remove('hidden')
                    ref.current?.focus()
                }} />
                <div ref={ref} className="absolute hidden mt-2" tabIndex={-1} onBlur={() => {
                    ref.current?.classList.add('hidden')
                }}>
                    <Calendar pageCount={pageCount} startMonth={startMonth} />
                </div>
            </div>
        </DatePickerContext.Provider>
    )
}
