import { ICommonGetListQuery } from 'src/common/interfaces';

export type IGetRoleListQuery = ICommonGetListQuery;

export interface ICreateRoleBody {
    name: string;
}

export interface IUpdateRoleBody {
    name: string;
}

export interface IChangeRolePermissionsBody {
    permissionIds: number[];
}
