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
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { JoiValidationPipe } from 'src/common/pipes';
import { SuccessResponse } from './../../common/helper/reponses';
import {
    IChangeRolePermissionsBody,
    ICreateRoleBody,
    IGetRoleListQuery,
    IUpdateRoleBody,
} from './role.interface';
import { RoleService } from './role.service';
import {
    createRoleSchema,
    roleGetListQuerySchema,
    updateRolePermissionsSchema,
    updateRoleSchema,
} from './role.validator';

@Controller('/roles')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post('/')
    async createRole(
        @Body(new JoiValidationPipe(createRoleSchema)) body: ICreateRoleBody,
    ) {
        try {
            const role = await this.roleService.createRole(body);
            return new SuccessResponse(role);
        } catch (error) {
            throw error;
        }
    }

    @Get('/')
    async getRoleList(
        @Query(new JoiValidationPipe(roleGetListQuerySchema))
        query: IGetRoleListQuery,
    ) {
        try {
            const roles = await this.roleService.getRoleList(query);
            return new SuccessResponse(roles);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    async getRoleDetail(@Param('id') id: number) {
        try {
            const role = await this.roleService.getRoleById(id);
            return new SuccessResponse(role);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    async updateRole(
        @Param('id') id: number,
        @Body(new JoiValidationPipe(updateRoleSchema)) body: IUpdateRoleBody,
    ) {
        try {
            const role = await this.roleService.updateRole(id, body);
            return new SuccessResponse(role);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id/change-permissions')
    async changeRolePermissions(
        @Param('id') id: number,
        @Body(new JoiValidationPipe(updateRolePermissionsSchema))
        body: IChangeRolePermissionsBody,
    ) {
        try {
            const role = await this.roleService.changeRolePermissions(id, body);
            return new SuccessResponse(role);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    async deleteRole(@Param('id') id: number) {
        try {
            const result = await this.roleService.deleteRole(id);
            return new SuccessResponse(result);
        } catch (error) {
            throw error;
        }
    }
}
