import React, { createContext } from "react";
import type { HtmlPortalNode } from "react-reverse-portal";

// Todo: Define the mount point reference type.
export type MountPointReference = string;

/**
 * The available render modes for SwitchableMountProvider.
 * "default" uses normal React rendering.
 * "reverse-portal" uses react-reverse-portal to render into a reverse portal, ensuring that the content doesn't get
 * rebuilt when moving between mount points.
 */
export type SwitchableMountRenderMode = "default" | "reverse-portal";

export type SwitchableMountContextType = {
    // Priorities set should be in here.
    // Should be a Map of priority number to target mount point.
    registerMountPoint: (priority: number, mountPoint: MountPointReference) => void;
    unregisterMountPoint: (mountPoint: MountPointReference) => void;
    renderCallback: () => React.ReactNode;
    highestPriorityEntryId?: MountPointReference;
    renderMode: SwitchableMountRenderMode;
    reversePortalNode?: HtmlPortalNode;
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
    },
    renderMode: "default"
});