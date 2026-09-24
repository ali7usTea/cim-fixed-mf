export const TAB_CONFIG = [
    { label: "Locnet / Circuit details", key: "Locnet", show: "locnetTab" },
    { label: "EID Status", key: "EIDStatus", show: "" },
    { label: "Elife Details", key: "Elife", show: "" },
    { label: "CCB", key: "CCB", show: "" },
    {
        label: "Favorite Country",
        key: "FavoriteCountry",
        show: "favoriteCountry_tab"
    },
    { label: "Full Home WIFI", key: "FullHomeWIFI", show: "home_Wifi_Tab" },
    { label: "PABX/PRI Details", key: "PABXDetails", show: "PABX_details_tab" },
    {
        label: "Installation Address",
        key: "InstallationAddress",
        show: "installationAddressTab"
    },
    { label: "Fixed on LTE", key: "FixedOnLTE", show: "DELoverLTE_Tab" },
    {
        label: "Business Flat Plus",
        key: "BusinessFlatPlus",
        show: "businessFlatPlusDetailsTab"
    },
    { label: "Outages", key: "Outages", show: "outagesTab" },
    {
        label: "Call Forwarding",
        key: "CallForwarding",
        show: "call_forwarding_tab"
    },
    {
        label: "Global Toll Free Details",
        key: "GlobalTollFree",
        show: "global_toll_free_details_tab"
    },
    {
        label: "Toll Free Number Inquiry",
        key: "TollFreeNumberInquiry",
        show: "tollFreeNumberInquiryTab"
    },
    {
        label: "Managed Services",
        key: "ManagedServices",
        show: "managed_services_tab"
    },
    { label: "E-Hospitality", key: "EHospitality", show: "eHospitalityTab" },
    // { label: 'E-Hospitality', key: 'EHospitality', show: 'eHospitalityTab' },
    {
        label: "Data/Leased Line",
        key: "InternetLeasedLine",
        show: "internetLeasedLineTab"
    },
    {
        label: "Internet Bundles Net Details",
        key: "InternetBundleFreeDetails",
        show: "ucaas_total_net_details_tab"
    }
] as const;
