import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/globals.css";
import "cim-ui-components/cim-ui-components.css";
import ClientProviders from "./app/ClientProviders";
import ActionReportLayout from "./app/debugReport/layout";
import ActionReportPage from "./app/main/debugReport/page";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/fixed" element={<App />}></Route>
                <Route
                    path="/fixed/debugReport"
                    element={
                        <ClientProviders>
                            <ActionReportLayout>
                                <ActionReportPage />
                            </ActionReportLayout>
                        </ClientProviders>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
