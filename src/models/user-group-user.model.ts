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
import { UserGroup } from './user-group.model';
import { User } from './user.model';

@Table({
    tableName: DatabaseTableName.USER_GROUP_USER,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class UserGroupUser extends Model<
    InferAttributes<UserGroupUser>,
    InferCreationAttributes<UserGroupUser>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserGroup)
    @Column
    userGroupId: number;

    @ForeignKey(() => User)
    @Column
    userId: number;
}
