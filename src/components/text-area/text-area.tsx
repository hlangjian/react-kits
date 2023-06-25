import { variants } from "@/index";
import { VariantProps } from "@/utils/variants";
import * as React from "react";

export const textAreaVariants = variants({
  base: "text-area",
  variants: {
    resize: {
        true: 'resize',
    }
  }
});

export type TextAreaProps = VariantProps<typeof textAreaVariants> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, resize, ...props }, ref) => {
    return (
      <textarea
        className={textAreaVariants({ resize, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";
