import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DatabaseTableName } from './constant';
import { Role } from './role.model';
import { User } from './user.model';

@Table({
    tableName: DatabaseTableName.USER_ROLE,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})
export class UserRole extends Model<
    InferAttributes<UserRole>,
    InferCreationAttributes<UserRole>
> {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Role)
    @Column
    roleId: number;
}
