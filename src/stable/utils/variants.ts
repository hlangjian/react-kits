export type VariantsFunction = <T extends object>(props: {
  base?: string;
  variants?: T;
  defaultVariants?: { [key in keyof T]?: keyof T[key] };
}) => (
  args: { [key in keyof T]?: keyof T[key] } & { className?: string }
) => string;

export const variants: VariantsFunction = (props) => {
  const { base = "", variants = {}, defaultVariants = {} } = props;
  return (args) => {
    const { className, ...variantArgs } = args;
    const actualVariantArgs = merge(defaultVariants, variantArgs);

    const variantsClass = Object.entries(actualVariantArgs).map(
      ([key, value]) => {
        // @ts-ignore
        return variants[key][value];
      }
    );
    return [base, ...variantsClass, className].filter((s) => s).join(" ");
  };
};

export type VariantProps<T extends (args: object) => string> = Omit<
  Parameters<T>[0],
  "className"
>;

const merge = <T extends object>(obj1: T, obj2: T) => {
  const result = { ...obj1 };
  Object.entries(obj2)
    .filter(([, value]) => typeof value !== "undefined")
    .forEach(([k, v]) =>
      Object.defineProperty(result, k, {
        value: v,
        enumerable: true,
      })
    );
  return result;
};
