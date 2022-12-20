import { OrderBy, OrderDirection } from './constants';

export interface ICommonGetListQuery {
    page?: number;
    limit?: number;
    keyword?: string;
    orderDirection?: OrderDirection;
    orderBy?: OrderBy;
}

export interface UserToken {
    userId: string;
    username: string;
    roles?: number[];
    permissions?: number[];
}

export interface RequestWithUser extends Request {
    user: UserToken;
}
