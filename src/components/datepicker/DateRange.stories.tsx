import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Calendar, DatePicker } from "./DatePicker";

export default {
    component: DatePicker
} satisfies Meta<typeof DatePicker>

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
    args: {
        pageCount: 2,
        mode: 'single',
    },
    render: function Render(props) {
        const [key, setKey] = useState(new Date().getTime())


        return <DatePicker {...props} key={key} />
    }
}

export const DatePickerStory = {
    render: function Render() {

        return (
            <DatePicker />
        )
    }
}