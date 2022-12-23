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
import { User } from './user.model';

@Table({
    tableName: DatabaseTableName.USER_ROLE_GROUP,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class UserRoleGroup extends Model<
    InferAttributes<UserRoleGroup>,
    InferCreationAttributes<UserRoleGroup>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => RoleGroup)
    @Column
    roleGroupId: number;
}
