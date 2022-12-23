import { AuthorizationGuard } from './../../common/guards/authorization.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { SuccessResponse } from 'src/common/helper/reponses';
import { JoiValidationPipe } from 'src/common/pipes';
import {
    IChangeUserGroupUsersBody,
    ICreateUserGroupBody,
    IGetUserGroupListQuery,
    IUpdateUserGroupBody,
} from './user-group.interface';
import { UserGroupService } from './user-group.service';
import {
    createUserGroupSchema,
    updateUserGroupSchema,
    updateUserGroupUsersSchema,
    userGroupGetListQuerySchema,
} from './user-group.validator';

@Controller('/user-groups')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class UserGroupController {
    constructor(private userGroupService: UserGroupService) {}

    @Get('/')
    async getUserList(
        @Query(new JoiValidationPipe(userGroupGetListQuerySchema))
        query: IGetUserGroupListQuery,
    ) {
        try {
            const userGroupList = await this.userGroupService.getUserGroupList(
                query,
            );
            return new SuccessResponse(userGroupList);
        } catch (error) {
            throw error;
        }
    }

    @Post('/')
    async createUserGroup(
        @Body(new JoiValidationPipe(createUserGroupSchema))
        body: ICreateUserGroupBody,
    ) {
        try {
            const createdUserGroup =
                await this.userGroupService.createUserGroup(body);
            return new SuccessResponse(createdUserGroup);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    async getUserGroupDetail(@Param('id') userGroupId: number) {
        try {
            const userGroup = await this.userGroupService.getUserGroupById(
                userGroupId,
            );
            return new SuccessResponse(userGroup);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    async updateUserGroup(
        @Param('id') userGroupId: number,
        @Body(new JoiValidationPipe(updateUserGroupSchema))
        body: IUpdateUserGroupBody,
    ) {
        try {
            const userGroup = await this.userGroupService.updateUserGroup(
                userGroupId,
                body,
            );
            return new SuccessResponse(userGroup);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id/change-users')
    async changeUserGroupUsers(
        @Param('id') userGroupId: number,
        @Body(new JoiValidationPipe(updateUserGroupUsersSchema))
        body: IChangeUserGroupUsersBody,
    ) {
        try {
            const userGroup = await this.userGroupService.changeUserGroupUsers(
                userGroupId,
                body,
            );
            return new SuccessResponse(userGroup);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    async deleteUserGroup(@Param('id') userGroupId: number) {
        try {
            const result = await this.userGroupService.deleteUserGroup(
                userGroupId,
            );
            return new SuccessResponse(result);
        } catch (error) {
            throw error;
        }
    }
}
