

export const merge = <T extends object, U extends Partial<T>>(obj1: T, obj2: U) => {
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
