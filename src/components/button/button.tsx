import React from "react";
import { VariantProps, variants } from "@/utils/variants";

const buttonVariants = variants({
  base: "btn",
  variants: {
    variant: {
      contained: "btn-contained",
      outlined: "btn-outlined",
      ghost: "btn-ghost",
    },
    size: {
      normal: "btn-nromal",
      small: "btn-small",
    },
  },
  defaultVariants: {
    variant: "contained",
    size: "normal",
  },
});

export type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        {...props}
        ref={ref}
      />
    );
  }
);
Button.displayName = "button";
