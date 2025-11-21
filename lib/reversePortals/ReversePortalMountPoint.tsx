import * as portals from "react-reverse-portal";
import { SwitchableMountContext } from "../SwitchableMountContext";
import { useContext } from "react";

const ReversePortalMountPoint = () => {
    const { reversePortalNode } = useContext(SwitchableMountContext);
    if (!reversePortalNode) {
        console.error("ReversePortalMountPoint mounted before reversePortalNode is available in context");
        return null;
    }
    return <portals.OutPortal node={reversePortalNode} />;
};

export default ReversePortalMountPoint;
