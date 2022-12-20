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
import { RoleGroupRole } from './role-group.role.model';
import { Role } from './role.model';
import { UserRoleGroup } from './user-role-group.model';
import { User } from './user.model';

@Table({
    tableName: DatabaseTableName.ROLE_GROUP,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class RoleGroup extends Model<
    InferAttributes<RoleGroup>,
    InferCreationAttributes<RoleGroup>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(() => Role, () => RoleGroupRole)
    roles: Role[];

    @BelongsToMany(() => User, () => UserRoleGroup)
    user: User[];

    declare setRoles: (roleIds: number[]) => Promise<void>;
}
