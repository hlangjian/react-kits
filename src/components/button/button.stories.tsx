import { Button, type ButtonProps } from "./button";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Button,
  args: {
    children: "Button",
    variant: "contained",
    size: "normal",
    disabled: false
  },
  argTypes: {
    variant: {
      options: ["contained", "outlined", "ghost", "link"],
      control: { type: "radio" },
    },
    size: {
      options: ["normal", "small"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<ButtonProps>;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {};
