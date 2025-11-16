import { createContext } from "react";

// Todo: Define the mount point reference type.
type MountPointReference = unknown;

type SwitchableMountContextType = {
    // Priorities set should be in here.
    // Should be a Map of priority number to target mount point.
    registerMountPoint?: (priority: number, mountPoint: MountPointReference) => void;
    unregisterMountPoint?: (mountPoint: MountPointReference) => void;
};

const SwitchableMountContext = createContext<SwitchableMountContextType>({});

type SwitchableMountProviderProps = {
    children: React.ReactNode
};

const SwitchableMountProvider = ({ children } : SwitchableMountProviderProps) => {
    const contextValue : SwitchableMountContextType = {
        
    };
    return <SwitchableMountContext.Provider value={contextValue}>
        { children }
    </SwitchableMountContext.Provider>
};

export default SwitchableMountProvider;
