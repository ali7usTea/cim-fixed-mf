import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import { RootState } from "../../redux/store";

export const usePermissionChecker = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { tabPermissionMap, AllTabPermissionMap } = useSelector(
        (state: RootState) => state.TabPermisionslice
    );
    const { groupPermissionMap, AllGroupPermissionMap } = useSelector(
        (state: RootState) => state.GroupPermisionslice
    );
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const accountId =
        searchParams?.get("accountId")! || searchParams?.get("accountID")!;

    const evaluateExpression = useCallback(
        (expression: string, variables?: Record<string, string>): boolean => {
            try {
                const cleanedExpression = expression
                    .replace(/\\"/g, '"')
                    .replace(/\.contains\(/g, ".includes(");
                if (variables) {
                    // Create a secure sandbox for evaluating the expression
                    // Use 'with' statement to make variables accessible in the expression scope
                    const func = new Function(
                        "variables",
                        `
              with (variables) {
                return ${cleanedExpression};
              }
            `
                    );

                    return func(variables);
                }

                return false;
            } catch (error) {
                console.error(
                    `Error evaluating expression "${expression}":`,
                    error
                );
                return false;
            }
        },
        []
    );

    const checkTabPermissionExists = useCallback(
        (permissionName: string): boolean => {
            const variables = { ...Customers[accountId] };

            // Ensure AllTabPermissionMap is defined and not null
            if (!AllTabPermissionMap || !AllTabPermissionMap[permissionName]) {
                return true; // If not present or map is undefined, grant permission
            }

            // Check specific tabPermissionMap
            const tabPermission = tabPermissionMap[permissionName];
            if (tabPermission) {
                const expression = tabPermission.tabExpression;
                if (!expression?.length || !variables) {
                    return true;
                } else {
                    return evaluateExpression(expression, variables);
                }
            } else {
                console.log("** Check > BFF::Tab::Permission");
                return false;
            }
        },
        [
            AllTabPermissionMap,
            tabPermissionMap,
            Customers,
            accountId,
            evaluateExpression
        ]
    );

    const checkGroupPermissionExists = useCallback(
        (permissionName: string): boolean => {
            const variables = { ...Customers[accountId] };

            // Ensure AllGroupPermissionMap is defined and not null
            if (
                !AllGroupPermissionMap ||
                !AllGroupPermissionMap[permissionName]
            ) {
                return true; // If not present or map is undefined, grant permission
            }

            // Check specific groupPermissionMap
            const groupPermission = groupPermissionMap[permissionName];
            if (groupPermission) {
                const expression = groupPermission.groupExpression;
                if (!expression?.length || !variables) {
                    return true;
                } else {
                    return evaluateExpression(expression, variables);
                }
            } else {
                console.log("** Check > BFF::Group::Permission");
                return false;
            }
        },
        [
            AllGroupPermissionMap,
            groupPermissionMap,
            Customers,
            accountId,
            evaluateExpression
        ]
    );

    return {
        checkTabPermissionExists,
        checkGroupPermissionExists
    };
};
