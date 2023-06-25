import { variants } from "@/index"
import { VariantProps } from "@/utils/variants"
import { MenuHTMLAttributes, forwardRef } from "react"

export const ListVariants = variants({
    base: "menu"
})

export type ListProps = MenuHTMLAttributes<HTMLUListElement> & VariantProps<typeof ListVariants>

export const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
    const { children, className, ...others } = props
    return (
        <ul className={ListVariants({ className })} {...others} ref={ref}>
            {children}
        </ul>
    )
})

export const ListItemVariants = variants({
    base: "menu-item"
})

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
    icon?: React.ReactNode | boolean
    disabled?: boolean
} & VariantProps<typeof ListItemVariants>

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
    const { icon = false, disabled, children, className, ...others } = props

    return (
        <li aria-disabled={disabled} className={ListItemVariants({ className })} {...others} ref={ref}>
            {icon === true && <div className="menu-item-icon"></div>}
            {icon && icon !== true && <div className="menu-item-icon">{icon}</div>}
            {children}
        </li>
    )
})
ListItem.displayName = "list-item"