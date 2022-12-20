import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DatabaseTableName } from './constant';
import { RoleGroup } from './role-group.model';
import { Role } from './role.model';

@Table({
    tableName: DatabaseTableName.ROLE_GROUP_ROLE,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class RoleGroupRole extends Model<
    InferAttributes<RoleGroupRole>,
    InferCreationAttributes<RoleGroupRole>
> {
    @ForeignKey(() => RoleGroup)
    @Column
    roleGroupId: number;

    @ForeignKey(() => Role)
    @Column
    roleId: number;
}
