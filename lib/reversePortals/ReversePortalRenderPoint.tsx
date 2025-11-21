import * as portals from "react-reverse-portal";

type ReversePortalMountAdapterProps = {
    /**
     * A function to be used as a component, which will be rendered into the reverse portal.
     */
    renderFunc: () => React.ReactNode,
    portalNode?: portals.HtmlPortalNode
};

/**
 * This component acts as a central render point for a reverse portal. Powered by react-reverse-portal - make sure it's
 * installed in your project!
 * @see https://github.com/httptoolkit/react-reverse-portal
 */
const ReversePortalRenderPoint = ({ renderFunc: RenderComponent, portalNode }: ReversePortalMountAdapterProps) => {
    if (!portalNode) {
        return null;
    } else {
        return <portals.InPortal node={portalNode}>
            <RenderComponent />
        </portals.InPortal>;
    }
};

export default ReversePortalRenderPoint;
