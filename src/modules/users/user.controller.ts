import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Permission } from 'src/common/constants';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { SuccessResponse } from 'src/common/helper/reponses';
import { JoiValidationPipe } from 'src/common/pipes';
import {
    IChangeUserPasswordBody,
    IChangeUserRoleGroupsBody,
    IChangeUserRolesBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';
import { UserService } from './user.service';
import {
    updateUserPasswordSchema,
    updateUserProfileSchema,
    updateUserRoleGroupsSchema,
    updateUserRolesSchema,
    userGetListQuerySchema,
} from './user.validator';

@Controller('/users')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    @Permissions(Permission.READ_USER)
    async getUserList(
        @Query(new JoiValidationPipe(userGetListQuerySchema))
        query: IGetUserListQuery,
    ) {
        try {
            const users = await this.userService.getUserList(query);
            return new SuccessResponse(users);
        } catch (error) {
            throw error;
        }
    }

    @Get('/profile')
    async getUserSelfProfile(@UserId() userId: number) {
        try {
            const user = await this.userService.getUserById(userId);
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/profile')
    @Permissions(Permission.UPDATE_USER_PROFILE)
    async updateUserSelfProfile(
        @UserId() userId: number,
        @Body(new JoiValidationPipe(updateUserProfileSchema))
        body: IUpdateUserBody,
    ) {
        try {
            const user = await this.userService.updateUserProfile(userId, body);
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/profile/change-password')
    @Permissions(Permission.CHANGE_PASSWORD)
    async updateUserPassword(
        @UserId() userId: number,
        @Body(new JoiValidationPipe(updateUserPasswordSchema))
        body: IChangeUserPasswordBody,
    ) {
        try {
            const user = await this.userService.updateUserPassword(
                userId,
                body,
            );
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @Permissions(Permission.READ_USER)
    async getUserDetail(@Param('id') id: number) {
        try {
            const user = await this.userService.getUserById(id);
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id/mentees')
    @Permissions(Permission.READ_USER)
    async getUserMentees(@Param('id') id: number) {
        try {
            const mentees = await this.userService.getUserMentees(id);
            return new SuccessResponse(mentees);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id/change-roles')
    @Permissions(Permission.CHANGE_USER_ROLES)
    async updateUserRoles(
        @Param('id') userId: number,
        @Body(new JoiValidationPipe(updateUserRolesSchema))
        body: IChangeUserRolesBody,
    ) {
        try {
            const user = await this.userService.updateUserRoles(userId, body);
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id/change-role-groups')
    @Permissions(Permission.CHANGE_USER_ROLES)
    async updateUserRoleGroups(
        @Param('id') userId: number,
        @Body(new JoiValidationPipe(updateUserRoleGroupsSchema))
        body: IChangeUserRoleGroupsBody,
    ) {
        try {
            const user = await this.userService.updateUserRoleGroups(
                userId,
                body,
            );
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    @Permissions(Permission.DELETE_USER)
    async deleteUser(@Param('id') id: number) {
        try {
            const result = await this.userService.deleteUser(id);
            return new SuccessResponse(result);
        } catch (error) {
            throw error;
        }
    }
}
