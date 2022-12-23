import { ICommonGetListQuery } from 'src/common/interfaces';

export type IGetUserGroupListQuery = ICommonGetListQuery;

export interface ICreateUserGroupBody {
    name: string;
    managerId?: number;
}

export type IUpdateUserGroupBody = Partial<ICreateUserGroupBody>;

export interface IChangeUserGroupUsersBody {
    userIds: number[];
}
