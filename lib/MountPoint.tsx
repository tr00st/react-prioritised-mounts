import { useContext, useEffect, useId } from "react";
import { SwitchableMountContext } from "./SwitchableMountProvider";

type MountPointProps = {
    canShow: boolean,
    priority: number
};

const MountPoint = ({
    canShow,
    priority
}: MountPointProps) => {
    const mountPointId = useId();
    const {
        highestPriorityEntryId,
        registerMountPoint,
        unregisterMountPoint
    } = useContext(SwitchableMountContext);
    const isCurrentHighestPriority = mountPointId === highestPriorityEntryId;
    useEffect(() => {
        if (canShow) {
            registerMountPoint(priority, mountPointId);
        }
        return () => {
            unregisterMountPoint(mountPointId);
        };
    }, [canShow]);
    const show = canShow && isCurrentHighestPriority;
    return show ? <div>Mounted</div> : null;
};

export default MountPoint;
