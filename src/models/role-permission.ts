import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
    AutoIncrement,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Permission } from 'src/models/permission.model';
import { DatabaseTableName } from './constant';
import { Role } from './role.model';

@Table({
    tableName: DatabaseTableName.ROLE_PERMISSION,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class RolePermission extends Model<
    InferAttributes<RolePermission>,
    InferCreationAttributes<RolePermission>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @ForeignKey(() => Permission)
    @Column
    permissionId: number;
}
