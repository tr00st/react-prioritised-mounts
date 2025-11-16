import { createContext, useState } from "react";

// Todo: Define the mount point reference type.
type MountPointReference = string;

type SwitchableMountContextType = {
    // Priorities set should be in here.
    // Should be a Map of priority number to target mount point.
    registerMountPoint: (priority: number, mountPoint: MountPointReference) => void;
    unregisterMountPoint: (mountPoint: MountPointReference) => void;
    highestPriorityEntryId?: MountPointReference;
};

export const SwitchableMountContext = createContext<SwitchableMountContextType>({});

type SwitchableMountProviderProps = {
    children: React.ReactNode
};

type RegisteredComponentEntry = {
    priority: number
};

type RegisteredComponentRecord = Record<string, RegisteredComponentEntry>; 

const SwitchableMountProvider = ({ children } : SwitchableMountProviderProps) => {
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
        highestPriorityEntryId: highestPriorityEntry ? highestPriorityEntry[0] : undefined
    };
    return <SwitchableMountContext.Provider value={contextValue}>
        { children }
    </SwitchableMountContext.Provider>
};

export default SwitchableMountProvider;
