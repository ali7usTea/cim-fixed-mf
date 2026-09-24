// Provider Integrate react app to Redux
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { ReactNode } from "react";

interface ProviderProbs {
    children: ReactNode;
}
export function Providers({ children }: ProviderProbs) {
    const store = setupStore();

    return <Provider store={store}>{children}</Provider>;
}
