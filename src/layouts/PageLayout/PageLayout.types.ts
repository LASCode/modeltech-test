import {ReactNode} from "react";
import {FetchStatus} from "types/request.types";

export interface PageLayoutProps {
    withNavbar?: boolean;
    status?: FetchStatus;
    errorMessage?: string;
    onRetry?: () => void;
    skeleton?: ReactNode;
    children: ReactNode;
}