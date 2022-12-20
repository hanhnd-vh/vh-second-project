import { ICommonGetListQuery } from 'src/common/interfaces';

export type IGetRoleGroupListQuery = ICommonGetListQuery;

export interface ICreateRoleGroupBody {
    name: string;
}

export interface IUpdateRoleGroupBody {
    name: string;
}

export interface IChangeRoleGroupRolesBody {
    roleIds: number[];
}
