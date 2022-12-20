import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/common/guards/token.guard';
import { SuccessResponse } from 'src/common/helper/reponses';
import { RequestWithUser } from 'src/common/interfaces';
import {
    IChangeUserPasswordBody,
    IChangeUserRoleGroupsBody,
    IChangeUserRolesBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';
import { UserService } from './user.service';

@Controller('/users')
@UseGuards(TokenGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    async getUserList(@Query() query: IGetUserListQuery) {
        try {
            const users = await this.userService.getUserList(query);
            return new SuccessResponse(users);
        } catch (error) {
            throw error;
        }
    }

    @Get('/profile')
    async getUserSelfProfile(@Req() request: RequestWithUser) {
        try {
            const user = await this.userService.getUserById(request.userId);
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/profile')
    async updateUserSelfProfile(
        @Req() request: RequestWithUser,
        @Body() body: IUpdateUserBody,
    ) {
        try {
            const user = await this.userService.updateUserProfile(
                request.userId,
                body,
            );
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/profile/change-password')
    async updateUserPassword(
        @Req() request: RequestWithUser,
        @Body() body: IChangeUserPasswordBody,
    ) {
        try {
            const user = await this.userService.updateUserPassword(
                request.userId,
                body,
            );
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    async getUserDetail(@Param('id') id: number) {
        try {
            const user = await this.userService.getUserById(id);
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id/change-roles')
    async updateUserRoles(
        @Req() request: RequestWithUser,
        @Body() body: IChangeUserRolesBody,
    ) {
        try {
            const user = await this.userService.updateUserRoles(
                request.userId,
                body,
            );
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id/change-role-groups')
    async updateUserRoleGroups(
        @Req() request: RequestWithUser,
        @Body() body: IChangeUserRoleGroupsBody,
    ) {
        try {
            const user = await this.userService.updateUserRoleGroups(
                request.userId,
                body,
            );
            return new SuccessResponse(user);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        try {
            const result = await this.userService.deleteUser(id);
            return new SuccessResponse(result);
        } catch (error) {
            throw error;
        }
    }
}
