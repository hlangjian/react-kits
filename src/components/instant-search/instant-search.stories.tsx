import { Search, SearchProps } from "./instant-search";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: Search,
} satisfies Meta<typeof Search>;

type Story = StoryObj<SearchProps>;

export const Default: Story = {};
