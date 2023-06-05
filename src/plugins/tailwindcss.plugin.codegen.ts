
// This file is Auto-Generated!!
// Don't edit it!! 
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import chroma from "chroma-js";

const toRgb = (value: string[], key: number) =>
  chroma(value[key]).rgb().join(" ");

const isValidColor = (value: unknown): value is never =>
  typeof value === "object";

export default plugin(
  // @ts-ignore
  function ({ addComponents, matchUtilities, theme }) {
    const _colors = {
      ...theme("colors"),
      ...{
        inherit: undefined,
        current: undefined,
        transparent: undefined,
        black: undefined,
        white: undefined,
        tone: undefined,
      },
    };

    matchUtilities(
      {
        tone: (value) => {
          if (isValidColor(value))
            return {
              "--tone-50": toRgb(value, 50),
              "--tone-100": toRgb(value, 100),
              "--tone-200": toRgb(value, 200),
              "--tone-300": toRgb(value, 300),
              "--tone-400": toRgb(value, 400),
              "--tone-500": toRgb(value, 500),
              "--tone-600": toRgb(value, 600),
              "--tone-700": toRgb(value, 700),
              "--tone-800": toRgb(value, 800),
              "--tone-900": toRgb(value, 900),
              "--tone-950": toRgb(value, 950),
            };
          return null;
        },
      },
      { values: _colors }
    );

addComponents({".btn":{"@apply tone-primary p-2 outline-none border-none rounded transition duration-150 ease-in-out":{}},".btn-contained":{"@apply bg-tone-600 text-tone-50 shadow-md shadow-tone-300 active:shadow":{}},".btn-outlined":{"@apply bg-transparent text-tone-500 shadow-md shadow-tone-300 active:shadow ring-1 ring-tone-500":{}},".btn-ghost":{"@apply bg-transparent text-tone-500 active:bg-tone-100":{}},".btn-normal":{"@apply text-base py-2 px-4":{}},".btn-small":{"@apply text-sm py-1 px-3":{}}})
  },
  {
    theme: {
      extend: {
        colors: {
          primary: {
            "50": "#eff8ff",
            "100": "#dbeefe",
            "200": "#c0e2fd",
            "300": "#94d2fc",
            "400": "#61b7f9",
            "500": "#3d98f4",
            "600": "#257ae9",
            "700": "#1f65d6",
            "800": "#1f52ae",
            "900": "#1f4789",
            "950": "#182c53",
          },
          secondary: colors.cyan,
          warning: colors.red,
          neutral: colors.slate,
          tone: {
            "50": "rgb(var(--tone-50) / <alpha-value>)",
            "100": "rgb(var(--tone-100) / <alpha-value>)",
            "200": "rgb(var(--tone-200) / <alpha-value>)",
            "300": "rgb(var(--tone-300) / <alpha-value>)",
            "400": "rgb(var(--tone-400) / <alpha-value>)",
            "500": "rgb(var(--tone-500) / <alpha-value>)",
            "600": "rgb(var(--tone-600) / <alpha-value>)",
            "700": "rgb(var(--tone-700) / <alpha-value>)",
            "800": "rgb(var(--tone-800) / <alpha-value>)",
            "900": "rgb(var(--tone-900) / <alpha-value>)",
            "950": "rgb(var(--tone-950) / <alpha-value>)",
          },
        },
      },
    },
  }
);
