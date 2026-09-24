"use client";
import Layout from "../../layout/layout";
import { Suspense } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Spinner } from "cim-ui-components";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
    const { jwtToken } = useSelector((state: RootState) => state.auth);
    return (
        <Layout token={jwtToken as string}>
            <Suspense
                fallback={
                    <div className="h-full">
                        <Spinner />
                    </div>
                }
            >
                {children}
            </Suspense>
        </Layout>
    );
}
