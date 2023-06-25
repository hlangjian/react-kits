import React from "react";
import { VariantProps, variants } from "@/utils/variants";

export const buttonVariants = variants({
  base: "btn",
  variants: {
    variant: {
      contained: "btn-contained",
      outlined: "btn-outlined",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    size: {
      normal: "btn-normal",
      small: "btn-small",
    },
  },
  defaultVariants: {
    variant: "contained",
    size: "normal",
  },
});

// export type ButtonProps = VariantProps<typeof buttonVariants> &
//   React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "button";
