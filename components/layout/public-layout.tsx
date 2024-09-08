"use client";
import LayoutLoader from "@/components/layout-loader";
import { useMounted } from "@/hooks/use-mounted";
import { PublicHeader } from "../partials/public-header";
import PublicFooter from "../partials/public-footer";
import { ReactNode } from "react";

interface IPublicLayoutProps {
    children: ReactNode;
}

const PublicLayout: React.FC<IPublicLayoutProps> = ({ children }) => {
    const mounted = useMounted();
    if (!mounted) {
        return <LayoutLoader />;
    }
    return (
        <div className="bg-background">
            <PublicHeader />
            {children}
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
