import { OrderBy, OrderDirection } from './constants';

export interface ICommonGetListQuery {
    page?: number;
    limit?: number;
    orderDirection?: OrderDirection;
    orderBy?: OrderBy;
}

export interface UserToken {
    userId: number;
    username: string;
    roles?: number[];
    permissions?: number[];
}

export interface RequestWithUser extends Request {
    userId: number;
    username: string;
    roles?: number[];
    permissions?: number[];
}
