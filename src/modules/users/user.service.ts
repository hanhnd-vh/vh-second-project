import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from 'src/common/constants';
import { Role, RoleGroup, User, UserGroup } from 'src/models';
import { userExcludeAttributes } from 'src/models/user.model';
import { hash } from 'src/plugins/bcrypt';
import {
    IChangeUserPasswordBody,
    IChangeUserRoleGroupsBody,
    IChangeUserRolesBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    private readonly logger = new Logger(UserService.name);

    async getUserById(userId: number) {
        try {
            const user = await this.userModel.findByPk(userId, {
                attributes: {
                    exclude: userExcludeAttributes,
                },
                include: [Role, RoleGroup],
            });
            if (!user) {
                throw new NotFoundException('user not found!');
            }
            return user;
        } catch (error) {
            this.logger.error('Error at service getUserById: ' + error);
            throw error;
        }
    }

    async getUserByUsername(username: string) {
        try {
            const existedUser = await this.userModel.findOne({
                where: {
                    username,
                },
                include: [Role, RoleGroup],
            });
            if (!existedUser) {
                throw new NotFoundException('user not found!');
            }
            return existedUser;
        } catch (error) {
            this.logger.error('Error at service getUserByUsername: ' + error);
            throw error;
        }
    }

    async getUserList(query: IGetUserListQuery) {
        try {
            const {
                page = DEFAULT_PAGE_VALUE,
                limit = DEFAULT_PAGE_LIMIT,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
            } = query;
            const offset = (+page - 1) * +limit;

            const { rows, count } = await this.userModel.findAndCountAll({
                offset,
                limit: +limit,
                order: [[`${orderBy}`, `${orderDirection}`]],
                attributes: {
                    exclude: userExcludeAttributes,
                },
            });
            return { items: rows, totalItems: count };
        } catch (error) {
            this.logger.error('Error at service getUserList: ' + error);
            throw error;
        }
    }

    async updateUserProfile(userId: number, body: IUpdateUserBody) {
        try {
            const user = await this.getUserById(userId);
            const updatedUser = await user.update(body);
            return updatedUser;
        } catch (error) {
            this.logger.error('Error at service updateUserProfile: ' + error);
            throw error;
        }
    }

    async updateUserPassword(userId: number, body: IChangeUserPasswordBody) {
        try {
            const user = await this.getUserById(userId);
            const hashedPassword = await hash(body.password);
            const updatedUser = await user.update({
                password: hashedPassword,
            });
            return updatedUser;
        } catch (error) {
            this.logger.error('Error at service updateUserPassword: ' + error);
            throw error;
        }
    }

    async updateUserRoles(userId: number, body: IChangeUserRolesBody) {
        try {
            const user = await this.getUserById(userId);
            await user.setRoles(body.roleIds);
            const updatedUser = await this.getUserById(userId);
            return updatedUser;
        } catch (error) {
            this.logger.error('Error at service updateUserRoles: ' + error);
            throw error;
        }
    }

    async updateUserRoleGroups(
        userId: number,
        body: IChangeUserRoleGroupsBody,
    ) {
        try {
            const user = await this.getUserById(userId);
            await user.setRoleGroups(body.roleGroupIds);
            const updatedUser = await this.getUserById(userId);
            return updatedUser;
        } catch (error) {
            this.logger.error(
                'Error at service updateUserRoleGroups: ' + error,
            );
            throw error;
        }
    }

    async deleteUser(userId: number) {
        try {
            const user = await this.getUserById(userId);
            await user.destroy();
            return 'OK';
        } catch (error) {
            this.logger.error('Error at service deleteUser: ' + error);
            throw error;
        }
    }

    async checkExistedUserIds(userIds: number[]) {
        try {
            const existedUserList = await this.userModel.findAll({
                where: {
                    id: userIds,
                },
            });
            return existedUserList.length === userIds.length;
        } catch (error) {
            this.logger.error('Error at service checkExistedUserIds: ' + error);
            throw error;
        }
    }

    async getUserMentees(userId: number) {
        try {
            const user = await this.getUserById(userId);
            if (!user.manageGroups || !user.manageGroups.length)
                return {
                    items: [],
                    totalItems: 0,
                };

            const manageGroupsIds = user.manageGroups.map((group) => group.id);
            const mentees = await this.getUsersByUserGroupIds(manageGroupsIds);
            return mentees;
        } catch (error) {
            this.logger.error('Error at service getUserMentees: ' + error);
            throw error;
        }
    }

    async getUsersByUserGroupIds(userGroupIds: number[]) {
        try {
            const { rows, count } = await User.findAndCountAll({
                include: {
                    model: UserGroup,
                    attributes: [],
                    as: 'userGroups',
                    where: {
                        id: userGroupIds,
                    },
                    through: {
                        attributes: [],
                    },
                },
                attributes: {
                    exclude: userExcludeAttributes,
                },
                distinct: true,
            });
            return {
                items: rows,
                totalItems: count,
            };
        } catch (error) {
            this.logger.error(
                'Error at service getUserByUserGroupIds: ' + error,
            );
            throw error;
        }
    }
}
