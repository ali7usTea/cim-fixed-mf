"use client";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJwtToken, setState } from "../redux/auth/authSlice";
import {
    fetchAllGroupPermssion,
    fetchApiGroupPermssion
} from "../redux/groupPermission/groupPermssionSlice";
import { AppDispatch, RootState } from "../redux/store";
import {
    fetchAllTabPermssion,
    fetchApiTabPermssion
} from "../redux/tabPermission/tabPermssionSlice";
import { useSearchParams } from "react-router";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Spinner
} from "cim-ui-components";

interface Props {
    enabled: boolean;
}
type AuthState =
    | "authenticated"
    | "unauthenticated"
    | "authenticating"
    | "error";

const JWT_TOKEN_COOKIE_NAME = "jwtToken";
const AUTH_SERVER_URL = import.meta.env.VITE_PUBLIC_AUTH_SERVER_URL;

function getCookie(name: string) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
        return match[2];
    }
    return "";
}
function setHalfHourCookie(name: string, value: string) {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 60 * 1000); // 30 minutes from now
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `${name}=${value}${expires}; path=/`;
}

export function AuthProvider({ enabled }: Props) {
    const [searchParams] = useSearchParams();
    const dispatch: AppDispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    function preparePermissions(token: string, decodedToken: JwtPayload) {
        dispatch(
            fetchApiTabPermssion({
                jwtToken: token,
                ntLogin: decodedToken.sub as string
            })
        );
        dispatch(
            fetchAllTabPermssion({
                jwtToken: token,
                ntLogin: decodedToken.sub as string
            })
        );
        dispatch(
            fetchApiGroupPermssion({
                jwtToken: token,
                ntLogin: decodedToken.sub as string
            })
        );
        dispatch(
            fetchAllGroupPermssion({
                jwtToken: token,
                ntLogin: decodedToken.sub as string
            })
        );
    }

    useEffect(() => {
        if (!enabled) {
            dispatch(setState("authenticated"));
            setOpenDialog(false);
            return;
        }

        try {
            const tokenCookie = getCookie(JWT_TOKEN_COOKIE_NAME);
            const decodedToken = jwtDecode(tokenCookie);
            if (decodedToken == null || decodedToken.exp == null) {
                setOpenDialog(true);
                dispatch(setState("unauthenticated"));
                return;
            }

            // TODO: `Request for a token introspect API to validate token `
            // not a good practice to depend on browser time to validate token expiary.
            // we must have a token introspect API exposed where a client can pass the token to to validate the cached/received token.
            const now = Date.now() / 1000;
            if (decodedToken.exp < now) {
                dispatch(setState("unauthenticated"));
                setOpenDialog(true);
                return;
            }

            if (searchParams.get("cbid") != null && searchParams.get("cbid")) {
                window.location.search = getCookie(searchParams.get("cbid")!);
                return;
            }
            preparePermissions(tokenCookie, decodedToken);
            dispatch(setJwtToken(tokenCookie));
            dispatch(setState("authenticated"));
            setOpenDialog(false);
        } catch (error) {
            dispatch(setState("unauthenticated"));
            setOpenDialog(true);
        }
    }, []);

    return <AuthDialog open={openDialog} />;
}

export function AuthDialog({ open }: { open: boolean }) {
    const state = useSelector((state: RootState) => state.auth.state);
    const [searchParams] = useSearchParams();

    function redirectToAuthServer() {
        if (searchParams.get("cbid") != null && searchParams.get("cbid")) {
            const callBackUrl = `${AUTH_SERVER_URL}${window.location.href}`;
            window.location.href = callBackUrl;
            return;
        }
        const cbid = Date.now().toString();
        setHalfHourCookie(cbid, window.location.search);
        const callBackUrl = `${AUTH_SERVER_URL}${
            window.location.origin + window.location.pathname
        }?cbid=${cbid}`;
        window.location.href = callBackUrl;
    }

    return (
        <Dialog open={false} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Welcome to Our Service!</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col justify-start gap-4">
                    {state === "authenticating" && (
                        <div className="flex justify-center p-4">
                            <Spinner className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {state === "unauthenticated" && (
                        <>
                            <DialogDescription className="space-y-4 text-foreground">
                                <p>
                                    To get started, please click the "Login"
                                    button below.
                                </p>
                                <p>
                                    You will be redirected to a secure
                                    authentication page where you can enter your
                                    credentials for our OAuth service. Once
                                    authenticated, you will be brought back to
                                    our application, and you&apos;ll have access
                                    to all the features and resources we offer.
                                </p>
                                <p className="font-medium">
                                    Your security and privacy are our top
                                    priorities!
                                </p>
                            </DialogDescription>
                            <Button
                                onClick={redirectToAuthServer}
                                className="w-full"
                            >
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
