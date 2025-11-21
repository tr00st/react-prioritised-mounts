import type { Meta, StoryObj } from '@storybook/react';
import MountPoint from './MountPoint';
import SwitchableMountProvider from './SwitchableMountProvider';

const meta : Meta<typeof MountPoint> = {
    component: MountPoint,
    args: {
        canShow: true,
        priority: 1
    }
};

export default meta;

type Story = StoryObj

export const SimplePriority: Story = {
    render: () => <SwitchableMountProvider render={() => <span>Mounted content</span>}>
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
    render: () => <SwitchableMountProvider render={() => <span>Mounted content</span>}>
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
    render: () => <SwitchableMountProvider render={() => <span>Mounted content</span>}>
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


export const ReversePortal: Story = {
    render: () => <SwitchableMountProvider render={() => <span>Mounted content</span>} renderMode='reverse-portal'>
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