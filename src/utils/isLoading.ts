import {FetchStatus} from "../types/request.types";

export const isLoading = (status: FetchStatus) => [FetchStatus.IDLE, FetchStatus.PENDING].includes(status);