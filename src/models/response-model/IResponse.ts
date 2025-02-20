interface IBaseResponse {
    total: number;
    skip: number;
    limit: number;
}

interface IDynamicResponse<T> {
    [key: string]: T;
}

export type IResponse<T> = IBaseResponse & IDynamicResponse<T>;