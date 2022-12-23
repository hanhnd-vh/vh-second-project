import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { DatabaseTableName } from './constant';
import { UserGroupUser } from './user-group-user.model';
import { User } from './user.model';

@Table({
    tableName: DatabaseTableName.USER_GROUP,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class UserGroup extends Model<
    InferAttributes<UserGroup>,
    InferCreationAttributes<UserGroup>
> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @ForeignKey(() => User)
    @Column
    managerId: number;

    @BelongsTo(() => User)
    manager: User;

    @BelongsToMany(() => User, () => UserGroupUser)
    users: User[];

    declare setUsers: (userIds: number[]) => Promise<void>;
}
