import { variants } from "@/index";
import { VariantProps } from "@/utils/variants";
import * as React from "react";

export const textInputVariants = variants({
  base: "text-input",
  variants: {
    size: {
      normal: "text-input-normal",
      small: "text-input-small",
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

export type InputProps = VariantProps<typeof textInputVariants> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={textInputVariants({ size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
