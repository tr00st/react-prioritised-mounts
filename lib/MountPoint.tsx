import { useContext, useEffect, useId } from "react";
import { SwitchableMountContext } from "./SwitchableMountContext";

type MountPointProps = {
    /**
     * Whether this mount point is allowed to show the mounted content. If `false`, this mount point will not be
     * considered for mounting, and lower priority mount points will be considered instead.
     */
    canShow: boolean,
    /**
     * The priority of this mount point. Lower numbers indicate higher priority - ie: priority `1` is higher than priority `2`.
     */
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
        unregisterMountPoint,
        renderCallback: RenderCallback
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
    return show ? <RenderCallback /> : null;
};

export default MountPoint;
