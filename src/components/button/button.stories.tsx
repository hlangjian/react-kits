import { Button, ButtonProps } from "./button";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Button,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {};
