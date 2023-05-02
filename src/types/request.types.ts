export interface AsyncState {
    status: FetchStatus,
    error?: string,
}

export enum FetchStatus {
    IDLE = 'idle',
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}