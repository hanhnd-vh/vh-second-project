import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { uniq } from 'lodash';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from 'src/common/constants';
import { UserGroup } from 'src/models';
import { UserService } from '../users/user.service';
import {
    userGroupExcludeAttributes,
    userGroupIncludes,
} from './user-group.constant';
import {
    IChangeUserGroupUsersBody,
    ICreateUserGroupBody,
    IGetUserGroupListQuery,
    IUpdateUserGroupBody,
} from './user-group.interface';

@Injectable()
export class UserGroupService {
    constructor(
        @InjectModel(UserGroup) private userGroupModel: typeof UserGroup,
        private userService: UserService,
    ) {}

    private readonly logger = new Logger(UserGroupService.name);

    async createUserGroup(body: ICreateUserGroupBody) {
        try {
            if (body.managerId) {
                await this.userService.getUserById(body.managerId);
            }
            const createdUserGroup = await this.userGroupModel.create(body);
            const userGroup = await this.getUserGroupById(createdUserGroup.id);
            return userGroup;
        } catch (error) {
            this.logger.error('Error at createUserGroup service: ' + error);
            throw error;
        }
    }

    async getUserGroupList(query: IGetUserGroupListQuery) {
        try {
            const {
                page = DEFAULT_PAGE_VALUE,
                limit = DEFAULT_PAGE_LIMIT,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
            } = query;

            const offset = (+page - 1) * +limit;
            const { rows, count } = await this.userGroupModel.findAndCountAll({
                offset,
                limit: +limit,
                order: [[`${orderBy}`, `${orderDirection}`]],
                attributes: {
                    exclude: userGroupExcludeAttributes,
                },
            });
            return { items: rows, totalItems: count };
        } catch (error) {
            this.logger.error('Error at getUserGroupList service: ' + error);
            throw error;
        }
    }

    async updateUserGroup(userGroupId: number, body: IUpdateUserGroupBody) {
        try {
            const userGroup = await this.getUserGroupById(userGroupId);
            const updatedUserGroup = await userGroup.update(body);
            return updatedUserGroup;
        } catch (error) {
            this.logger.error('Error at updateUserGroup service: ' + error);
            throw error;
        }
    }

    async changeUserGroupUsers(
        userGroupId: number,
        body: IChangeUserGroupUsersBody,
    ) {
        try {
            const userGroup = await this.getUserGroupById(userGroupId);
            const uniqUserIds = uniq(body.userIds);
            const isUserIdsExisted = await this.userService.checkExistedUserIds(
                uniqUserIds,
            );
            if (!isUserIdsExisted) {
                throw new NotFoundException('some users not existed');
            }
            await userGroup.setUsers(uniqUserIds);
            const updatedUserGroup = await this.getUserGroupById(userGroupId);
            return updatedUserGroup;
        } catch (error) {
            this.logger.error(
                'Error at changeUserGroupUsers service: ' + error,
            );
            throw error;
        }
    }

    async deleteUserGroup(userGroupId: number) {
        try {
            const userGroup = await this.getUserGroupById(userGroupId);
            await userGroup.destroy();
            return 'OK';
        } catch (error) {
            this.logger.error('Error at deleteUserGroup service: ' + error);
            throw error;
        }
    }

    async getUserGroupById(id: number) {
        try {
            const userGroup = await UserGroup.findByPk(id, {
                include: userGroupIncludes,
                attributes: {
                    exclude: userGroupExcludeAttributes,
                },
            });
            if (!userGroup) {
                throw new NotFoundException('user group not found!');
            }
            return userGroup;
        } catch (error) {
            this.logger.error('Error at getUserGroupById service: ' + error);
            throw error;
        }
    }
}
