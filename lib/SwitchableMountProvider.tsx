import React, { useMemo, useState } from "react";
import { SwitchableMountContext, type MountPointReference, type SwitchableMountContextType, type SwitchableMountRenderMode } from "./SwitchableMountContext";
import ReversePortalRenderPoint from "./reversePortals/ReversePortalRenderPoint";
import * as portals from "react-reverse-portal";
import type { HtmlPortalNode } from "react-reverse-portal";


type SwitchableMountProviderProps = {
    /**
     * The child components which will contain MountPoints. If no MountPoints are registered, the render component will not be displayed.
     */
    children: React.ReactNode,
    /**
     * A function to be used as a component, which will be rendered into the highest priority mount point.
     */
    render: () => React.ReactNode
    renderMode?: SwitchableMountRenderMode;
};

type RegisteredComponentEntry = {
    priority: number
};

type RegisteredComponentRecord = Record<string, RegisteredComponentEntry>; 

const SwitchableMountProvider = ({ children, render, renderMode = "default" } : SwitchableMountProviderProps) => {
    const [registeredComponents, setRegisteredComponents] = useState<RegisteredComponentRecord>({});

    const highestPriorityEntry = Object.entries(registeredComponents).reduce<[string, RegisteredComponentEntry] | null>((highest, current) => {
        if (!highest) return current;
        const [ , highestEntry ] = highest;
        const [ , currentEntry ] = current;
        if (currentEntry.priority < highestEntry.priority) {
            return current;
        }
        return highest;
    }, null);

    const reversePortalNode : HtmlPortalNode | undefined = useMemo(() => {
        if (renderMode === "reverse-portal") {
            return portals.createHtmlPortalNode();
        } else {
            return undefined;
        }
    }, [renderMode]);

    const contextValue : SwitchableMountContextType = {
        registerMountPoint: (priority: number, mountPoint: MountPointReference) => {
            setRegisteredComponents(previous => ({
                ...previous,
                [mountPoint]: {
                    priority: priority
                }
            }));
        },
        unregisterMountPoint: (mountPoint: MountPointReference) => {
            setRegisteredComponents(previous => {
                const newState = {...previous};
                delete newState[mountPoint];
                return newState;
            });
        },
        renderCallback: render,
        highestPriorityEntryId: highestPriorityEntry ? highestPriorityEntry[0] : undefined,
        renderMode: renderMode,
        reversePortalNode: reversePortalNode
    };

    return <SwitchableMountContext.Provider value={contextValue}>
        {renderMode === "reverse-portal" && <ReversePortalRenderPoint renderFunc={render} portalNode={reversePortalNode} />}
        { children }
    </SwitchableMountContext.Provider>
};

export default SwitchableMountProvider;
