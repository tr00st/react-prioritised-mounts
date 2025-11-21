import React, { createContext } from "react";

// Todo: Define the mount point reference type.
export type MountPointReference = string;

export type SwitchableMountContextType = {
    // Priorities set should be in here.
    // Should be a Map of priority number to target mount point.
    registerMountPoint: (priority: number, mountPoint: MountPointReference) => void;
    unregisterMountPoint: (mountPoint: MountPointReference) => void;
    renderCallback: () => React.ReactNode;
    highestPriorityEntryId?: MountPointReference;
};

export const SwitchableMountContext = createContext<SwitchableMountContextType>({
    registerMountPoint: () => {
        throw new Error("SwitchableMountProvider not found");
    },
    unregisterMountPoint: () => {
        throw new Error("SwitchableMountProvider not found");
    },
    renderCallback: () => {
        throw new Error("SwitchableMountProvider not found");
    }
});