import type { Meta, StoryObj } from '@storybook/react';
import { ExampleComponent } from './main';

const meta : Meta<typeof ExampleComponent> = {
};

export default meta;

type Story = StoryObj

export const Primary: Story = {
    render: () => <ExampleComponent />
};
