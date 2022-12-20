import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { DatabaseTableName } from './constant';
import { RolePermission } from './role-permission';
import { Role } from './role.model';

@Table({
    tableName: DatabaseTableName.PERMISSION,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class Permission extends Model<
    InferAttributes<Permission>,
    InferCreationAttributes<Permission>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(() => Role, () => RolePermission)
    roles: Role[];
}
