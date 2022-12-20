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
import { Permission, Role } from 'src/common/constants';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { SuccessResponse } from 'src/common/helper/reponses';
import { JoiValidationPipe } from 'src/common/pipes';
import {
    IChangeRoleGroupRolesBody,
    ICreateRoleGroupBody,
    IGetRoleGroupListQuery,
    IUpdateRoleGroupBody,
} from './role-group.interface';
import { RoleGroupService } from './role-group.service';
import {
    createRoleGroupSchema,
    roleGroupGetListQuerySchema,
    updateRoleGroupRolesSchema,
    updateRoleGroupSchema,
} from './role-group.validator';

@Controller('/role-groups')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class RoleGroupController {
    constructor(private roleGroupService: RoleGroupService) {}

    @Post('/')
    @Permissions(Permission.CREATE_ROLE_GROUP)
    async createRoleGroup(
        @Body(new JoiValidationPipe(createRoleGroupSchema))
        body: ICreateRoleGroupBody,
    ) {
        try {
            const roleGroup = await this.roleGroupService.createRoleGroup(body);
            return new SuccessResponse(roleGroup);
        } catch (error) {
            throw error;
        }
    }

    @Get('/')
    @Permissions(Permission.READ_ROLE_GROUP)
    async getRoleGroupList(
        @Query(new JoiValidationPipe(roleGroupGetListQuerySchema))
        query: IGetRoleGroupListQuery,
    ) {
        try {
            const roleGroups = await this.roleGroupService.getRoleGroupList(
                query,
            );
            return new SuccessResponse(roleGroups);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @Permissions(Permission.READ_ROLE_GROUP)
    async getRoleGroupDetail(@Param('id') id: number) {
        try {
            const roleGroup = await this.roleGroupService.getRoleGroupById(id);
            return new SuccessResponse(roleGroup);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    @Permissions(Permission.UPDATE_ROLE_GROUP)
    async updateRoleGroup(
        @Param('id') id: number,
        @Body(new JoiValidationPipe(updateRoleGroupSchema))
        body: IUpdateRoleGroupBody,
    ) {
        try {
            const roleGroup = await this.roleGroupService.updateRoleGroup(
                id,
                body,
            );
            return new SuccessResponse(roleGroup);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id/change-roles')
    @Roles(Role.ADMIN)
    async changeRoleGroupPermissions(
        @Param('id') id: number,
        @Body(new JoiValidationPipe(updateRoleGroupRolesSchema))
        body: IChangeRoleGroupRolesBody,
    ) {
        try {
            const roleGroup = await this.roleGroupService.changeRoleGroupRoles(
                id,
                body,
            );
            return new SuccessResponse(roleGroup);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    @Permissions(Permission.DELETE_ROLE_GROUP)
    async deleteRoleGroup(@Param('id') id: number) {
        try {
            const result = await this.roleGroupService.deleteRoleGroup(id);
            return new SuccessResponse(result);
        } catch (error) {
            throw error;
        }
    }
}
