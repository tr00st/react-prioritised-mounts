import { useContext, useEffect, useId } from "react";
import { SwitchableMountContext } from "./SwitchableMountContext";
import ReversePortalMountPoint from "./reversePortals/ReversePortalMountPoint";

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
        renderCallback: RenderCallback,
        renderMode
    } = useContext(SwitchableMountContext);
    const isCurrentHighestPriority = mountPointId === highestPriorityEntryId;
    useEffect(() => {
        if (canShow) {
            registerMountPoint(priority, mountPointId);
        }
        return () => {
            unregisterMountPoint(mountPointId);
        };
        // We intentionally only depend on canShow to avoid infinite loops. The registerMountPoint
        // and unregisterMountPoint functions are created on every provider render, so including them
        // as dependencies would cause the effect to run on every render. The mountPointId is stable
        // (from useId), and priority changes don't require re-registration - the provider will still
        // see the updated priority from the closure when it reads the component's current state.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canShow]);
    const show = canShow && isCurrentHighestPriority;
    if (!show) {
        return null;
    } else if (renderMode === "reverse-portal") {
        return <ReversePortalMountPoint />;
    } else {
        return <RenderCallback />;
    }
};

export default MountPoint;
