import { Input, InputProps } from "./text-input";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Input,
  argTypes: {
    size: {
      options: ["normal", "small"],
      control: { type: "radio" },
    },
  },
  args: {
    size: "normal",
    placeholder: "Input Somethings...",
    disabled: false
  },
} satisfies Meta<InputProps>;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  render: function Render(props){
    return (
      <div className="flex flex-row gap-4 items-center justify-center px-12 py-4">
        <Input {...props}></Input>
        <Input {...props}></Input>
        <Input {...props}></Input>
      </div>
    )
  }
};
