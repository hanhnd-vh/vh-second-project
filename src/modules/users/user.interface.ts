import { ICommonGetListQuery } from 'src/common/interfaces';

export type IGetUserListQuery = ICommonGetListQuery;

export interface ICreateUserBody {
    username: string;
    password: string;
    email: string;
    roleIds: number[];
}

export interface IUpdateUserBody {
    email: string;
}

export interface IChangeUserPasswordBody {
    password: string;
}

export interface IChangeUserRolesBody {
    roleIds: number[];
}

export interface IChangeUserRoleGroupsBody {
    roleGroupIds: number[];
}
