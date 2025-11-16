import type { Meta } from '@storybook/react';
import SwitchableMountProvider from "./SwitchableMountProvider";

const meta : Meta<typeof SwitchableMountProvider> = {
    component: SwitchableMountProvider,
    args: {
        render: () => <span>Mounted content</span>,
        children: <span>Child content</span>
    }
};

export default meta;

export const NoMountPoints = {
    children: () => <></>
};

