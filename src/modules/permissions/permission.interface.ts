import { ICommonGetListQuery } from 'src/common/interfaces';

export type IGetPermissionListQuery = ICommonGetListQuery;

export interface ICreatePermissionBody {
    name: string;
}

export interface IUpdatePermissionBody {
    name: string;
}
