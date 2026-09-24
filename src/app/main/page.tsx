"use client";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "cim-ui-components";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Suspense, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { COMPONENT_MAP } from "../../constants/component-map";
import { TAB_CONFIG } from "../../constants/tabs";
import { LayoutContext } from "../../layout/context/layoutcontext";
import { addCustomers } from "../../redux/customer/customerSlice";
import {
    fetchAllGroupPermssion,
    fetchApiGroupPermssion
} from "../../redux/groupPermission/groupPermssionSlice";
import { AppDispatch } from "../../redux/store";
import {
    fetchAllTabPermssion,
    fetchApiTabPermssion
} from "../../redux/tabPermission/tabPermssionSlice";
import { tokenValidate } from "../../utils/tokenValidator";
import { usePermissionChecker } from "../hooks/usePermissionsChecker";
import { home } from "lucide-react";

const FixedTab = () => {
    const dispatch: AppDispatch = useDispatch();
    const { jwtToken } = useContext(LayoutContext);
    const { checkTabPermissionExists } = usePermissionChecker();
    const [searchParams] = useSearchParams();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        const actid =
            searchParams.get("accountId")! ||
            searchParams.get("accountID")! ||
            searchParams.get("accountid")!;
        dispatch(
            addCustomers({
                key: actid,
                Customer: {
                    accountID: actid,
                    accountNumber:
                        searchParams.get("accountNumber")! ||
                        searchParams.get("accountnumber")!,
                    partyID:
                        searchParams.get("partyId")! ||
                        searchParams.get("partyID")! ||
                        searchParams.get("partyid")!,
                    productCode: searchParams.get("productCode")!,
                    productDescription: searchParams.get("productDescription")!,
                    productGroup: searchParams.get("productGroup")!,
                    productGroupCode: searchParams.get("productGroupCode")!,
                    productGroupCodeDesc: searchParams.get(
                        "productGroupCodeDesc"
                    )!,
                    customerSegment: searchParams.get("customerSegment")!,
                    customerSegmentGroup: searchParams.get(
                        "customerSegmentGroup"
                    )!,
                    customerCategory: searchParams.get("customerCategory")!,
                    productType: searchParams.get("productType")!,
                    regionCode: searchParams.get("regionCode")!,
                    profileID: searchParams.get("profileID")!,
                    isMaxSuffix: searchParams.get("isMaxSuffix")!,
                    customerID: searchParams.get("customerID")!,
                    isLandLine: searchParams.get("isLandLine")!,
                    isMobile: searchParams.get("isMobile")!,
                    customerName: searchParams.get("customerName")!,
                    partyProfileId: searchParams.get("partyProfileId")!,
                    accountStatus: searchParams.get("accountStatus")!,
                    valueSegment: searchParams.get("valueSegment")!,
                    preferredLanguage: searchParams.get("preferredLanguage")!,
                    productDesc: searchParams.get("productDesc")!,
                    businessSegmentValue: searchParams.get(
                        "businessSegmentValue"
                    )!,
                    contactSearchId: searchParams.get("contactSearchId")!,
                    domainName: searchParams.get("domainName")!,
                    userName: searchParams.get("userName")!,
                    subRequestProductCode: searchParams.get(
                        "subRequestProductCode"
                    )!,
                    subRequestProductGroupDesc: searchParams.get(
                        "subRequestProductGroupDesc"
                    )!,
                    subRequestProductGroup:
                        searchParams.get("subRequestProductGroup") || "",
                    subRequestTypeCode: searchParams.get("subRequestTypeCode")!,
                    subRequestProductGroupCode: searchParams.get(
                        "subRequestProductGroupCode"
                    )!,
                    noOfRecords: searchParams.get("noOfRecords")!,
                    EID: searchParams.get("EID")!,
                    UNIQUE_NUMBER: searchParams.get("UNIQUE_NUMBER")!,
                    "PVP FRP ID": searchParams.get("PVP FRP ID")!,
                    debugReport:
                        searchParams.get("debugReport")! ||
                        searchParams.get("debugreport")! ||
                        searchParams.get("debug_report")! ||
                        searchParams.get("isDebugMode")! ||
                        searchParams.get("isdebugmode")!
                }
            })
        );
    }, [dispatch, searchParams]);

    useEffect(() => {
        if (jwtToken) {
            const isValid = tokenValidate(jwtToken);
            if (isValid) {
                const decoded = jwtDecode<JwtPayload>(jwtToken);
                const ntLogin = decoded.sub as string;
                dispatch(fetchApiTabPermssion({ jwtToken, ntLogin }));
                dispatch(fetchAllTabPermssion({ jwtToken, ntLogin }));
                dispatch(fetchApiGroupPermssion({ jwtToken, ntLogin }));
                dispatch(fetchAllGroupPermssion({ jwtToken, ntLogin }));
            }
        }
    }, [dispatch, jwtToken]);

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
    <div className="flex-1 flex flex-col bg-[#EEF1EF] pt-3.5 px-4.5 pb-12.5 min-h-screen">
        <Card
        className="flex-1 flex flex-col"
        title="Fixed Products"
        subtitle="Fixed lines, plans, add-ons & equipment"
        icon={<home />}
      >
<div className="px-4 pb-4">
            <Tabs
                scrollable
                value={TAB_CONFIG[activeTabIndex]?.key}
                onValueChange={(value) => {
                    const nextIndex = TAB_CONFIG.findIndex(
                        (t) => t.key === value
                    );
                    handleTabChange(nextIndex);
                }}
            >
                <TabsList>
                    {TAB_CONFIG.map((tab) => {
                        if (!checkTabPermissionExists(tab.show)) return null;
                        return (
                            <TabsTrigger key={tab.key} value={tab.key} variant="secondary">
                                {tab.label}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {TAB_CONFIG.map((tab, idx) => {
                    // 1. Permission check first
                    if (!checkTabPermissionExists(tab.show)) return null;

                    const Component = COMPONENT_MAP[tab.key];
                    const isActive = activeTabIndex === idx;

                    return (
                        <TabsContent key={tab.key} value={tab.key}>
                            {/* 
                                Only render the component if the tab is active. 
                                Once rendered, React keeps it in the DOM (depending on your Tabs library), 
                                so it won't "re-load" when switching back.
                            */}
                            {isActive && (
                                <Suspense>
                                    <Component />
                                </Suspense>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>
            </div>
      </Card>
            
        </div>
    );
};

export default FixedTab;
