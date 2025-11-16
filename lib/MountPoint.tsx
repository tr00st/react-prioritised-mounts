
type MountPointProps = {
    canShow: boolean,
    priority: number
};

const MountPoint = ({
    canShow,
    priority
}: MountPointProps) => {
    return canShow ? <div>Mounted</div> : null;
};

export default MountPoint;
