import { lazy } from "react";

// Memoize components using lazy
export const COMPONENT_MAP = {
    Locnet: lazy(() => import("../app/components/Locnet")),
    EIDStatus: lazy(() => import("../app/components/EIDStatus")),
    Elife: lazy(() => import("../app/components/Elife")),
    CCB: lazy(() => import("../app/components/CCB")),
    FavoriteCountry: lazy(() => import("../app/components/FavoriteCountry")),
    FullHomeWIFI: lazy(() => import("../app/components/FullHomeWIFI")),
    PABXDetails: lazy(() => import("../app/components/PABXDetails")),
    InternetLeasedLine: lazy(
        () => import("../app/components/InternetLeasedLine")
    ),
    InstallationAddress: lazy(
        () => import("../app/components/InstallationAddress")
    ),
    FixedOnLTE: lazy(() => import("../app/components/FixedOnLTE")),
    BusinessFlatPlus: lazy(() => import("../app/components/BusinessFlatPlus")),
    Outages: lazy(() => import("../app/components/Outages")),
    CallForwarding: lazy(() => import("../app/components/CallForwarding")),
    GlobalTollFree: lazy(() => import("../app/components/GlobalTollFree")),
    ManagedServices: lazy(() => import("../app/components/ManagedServices")),
    TollFreeNumberInquiry: lazy(
        () => import("../app/components/TollFreeNumberInquiry")
    ),
    EHospitality: lazy(() => import("../app/components/EHospitality")),
    InternetBundleFreeDetails: lazy(
        () => import("../app/components/InternetBundlesNetDetails")
    )
};
