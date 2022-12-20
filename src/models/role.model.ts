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
import { Permission } from 'src/models/permission.model';
import { DatabaseTableName } from './constant';
import { RoleGroup } from './role-group.model';
import { RoleGroupRole } from './role-group.role.model';
import { RolePermission } from './role-permission';
import { UserRole } from './user-role.model';
import { User } from './user.model';

@Table({
    tableName: DatabaseTableName.ROLE,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(() => Permission, () => RolePermission)
    permissions: Permission[];

    @BelongsToMany(() => RoleGroup, () => RoleGroupRole)
    roleGroups: RoleGroup[];

    @BelongsToMany(() => User, () => UserRole)
    users: User[];

    declare setPermissions: (permissionIds: number[]) => Promise<void>;
}
