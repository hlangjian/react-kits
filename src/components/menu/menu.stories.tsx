import { Meta, StoryObj } from "@storybook/react";
import { List, ListItem, ListProps } from "./menu";

export default {
    component: List,
} satisfies Meta<ListProps>

type Story = StoryObj<ListProps>

function Render() {

    const list = [...Array(4).keys()]

    return (
        <List>
            {list.map(i => <ListItem key={i}>List Item {i}</ListItem>)}
        </List>
    )
}

export const Default: Story = {
    render: Render
}

export const InContainer: Story = {
    render: function InContainerRender() {
        return (
            <div className="w-72 h-128">
                <Render></Render>
            </div>
        )
    }
}

const Icon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zM8 6h8v2H8z" /></svg>)

export const WithIcon: Story = {
    render: function WithIcon() {
        return (
            <div className="w-72 h-128">
                <List>
                    <ListItem icon={<Icon />}>List Item With Icon</ListItem>
                    <ListItem icon>List Item With Icon</ListItem>
                    <ListItem icon disabled={true}>List Item With Icon Disabled</ListItem>
                </List>
            </div>
        )
    }
}