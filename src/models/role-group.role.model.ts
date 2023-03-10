import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
    AutoIncrement,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
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
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => RoleGroup)
    @Column
    roleGroupId: number;

    @ForeignKey(() => Role)
    @Column
    roleId: number;
}
