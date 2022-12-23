import { ICommonGetListQuery } from 'src/common/interfaces';

export interface IGetUserGroupListQuery extends ICommonGetListQuery {}

export interface ICreateUserGroupBody {
    name: string;
    managerId?: number;
}

export interface IUpdateUserGroupBody extends Partial<ICreateUserGroupBody> {}

export interface IChangeUserGroupUsersBody {
    userIds: number[];
}
