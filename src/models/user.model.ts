import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript';
import { DatabaseTableName } from './constant';
import { RoleGroup } from './role-group.model';
import { Role } from './role.model';
import { UserGroupUser } from './user-group-user.model';
import { UserGroup } from './user-group.model';
import { UserRoleGroup } from './user-role-group.model';
import { UserRole } from './user-role.model';

@Table({
    tableName: DatabaseTableName.USER,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    email: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @BelongsToMany(() => RoleGroup, () => UserRoleGroup)
    roleGroups: RoleGroup[];

    @BelongsToMany(() => UserGroup, () => UserGroupUser)
    userGroups: UserGroup[];

    @HasMany(() => UserGroup)
    manageGroups: UserGroup[];

    declare setRoles: (roleIds: number[]) => Promise<void>;
    declare setRoleGroups: (roleGroupIds: number[]) => Promise<void>;
}

export const userExcludeAttributes = ['password'];
