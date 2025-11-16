import type { Meta, StoryObj } from '@storybook/react';
import MountPoint from './MountPoint';
import SwitchableMountProvider from './SwitchableMountProvider';

const meta : Meta<typeof MountPoint> = {
};

export default meta;

type Story = StoryObj

export const SimplePriority: Story = {
    render: () => <SwitchableMountProvider>
        <p>First item should be mounted.</p>
        <ol>
            <li>
                <MountPoint canShow={true} priority={1} />
            </li>
            <li>
                <MountPoint canShow={true} priority={2} />
            </li>
            <li>
                <MountPoint canShow={true} priority={3} />
            </li>
        </ol>
    </SwitchableMountProvider>
};

export const OutOfOrderPriority: Story = {
    render: () => <SwitchableMountProvider>
        <p>Second item should be mounted.</p>
        <ol>
            <li>
                <MountPoint canShow={true} priority={3} />
            </li>
            <li>
                <MountPoint canShow={true} priority={1} />
            </li>
            <li>
                <MountPoint canShow={true} priority={2} />
            </li>
        </ol>
    </SwitchableMountProvider>
};

export const HightestPriorityCannotShow: Story = {
    render: () => <SwitchableMountProvider>
        <p>Third item should be mounted.</p>
        <ol>
            <li>
                <MountPoint canShow={true} priority={3} />
            </li>
            <li>
                <MountPoint canShow={false} priority={1} />
            </li>
            <li>
                <MountPoint canShow={true} priority={2} />
            </li>
        </ol>
    </SwitchableMountProvider>
};
