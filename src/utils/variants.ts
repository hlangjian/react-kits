import { merge } from "./merge";

export type VariantsFunction = <T extends object>(props: {
  base?: string;
  variants?: T;
  defaultVariants?: { [key in keyof T]?: keyof T[key] };
}) => (
  args: { [key in keyof T]?: keyof T[key] extends 'true' | 'false' ? boolean : keyof T[key] } & {
    className?: string;
    class?: string;
  }
) => string;

export const variants: VariantsFunction = (props) => {
  const { base = "", variants = {}, defaultVariants = {} } = props;
  return (args) => {
    const { className, class: clazz, ...variantArgs } = args;
    const actualVariantArgs = merge(defaultVariants, variantArgs);

    const variantsClass = Object.entries(actualVariantArgs).map(
      ([key, value]) => {
        if (key in variants) {
          // @ts-ignore
          return variants[key][value] as string;
        }
        return ''
      }
    );
    return [base, ...variantsClass, className, clazz]
      .filter((s) => s)
      .join(" ");
  };
};

export type VariantProps<T extends (args: object) => string> = Omit<
  Parameters<T>[0],
  "className"
>;