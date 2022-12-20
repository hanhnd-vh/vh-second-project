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
import { Role } from 'src/common/constants';
import { Roles } from 'src/common/decorators/role.decorator';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { SuccessResponse } from 'src/common/helper/reponses';
import { JoiValidationPipe } from 'src/common/pipes';
import {
    ICreatePermissionBody,
    IGetPermissionListQuery,
    IUpdatePermissionBody,
} from './permission.interface';
import { PermissionService } from './permission.service';
import {
    createPermissionSchema,
    permissionGetListQuerySchema,
    updatePermissionSchema,
} from './permission.validator';

@Controller('/permissions')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @Post('/')
    @Roles(Role.ADMIN)
    async createPermission(
        @Body(new JoiValidationPipe(createPermissionSchema))
        body: ICreatePermissionBody,
    ) {
        try {
            const permission = await this.permissionService.createPermission(
                body,
            );
            return new SuccessResponse(permission);
        } catch (error) {
            throw error;
        }
    }

    @Get('/')
    @Roles(Role.ADMIN)
    async getPermissionList(
        @Query(new JoiValidationPipe(permissionGetListQuerySchema))
        query: IGetPermissionListQuery,
    ) {
        try {
            const permissions = await this.permissionService.getPermissionList(
                query,
            );
            return new SuccessResponse(permissions);
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @Roles(Role.ADMIN)
    async getPermissionDetail(@Param('id') id: number) {
        try {
            const permission = await this.permissionService.getPermissionById(
                id,
            );
            return new SuccessResponse(permission);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    @Roles(Role.ADMIN)
    async updatePermission(
        @Param('id') id: number,
        @Body(new JoiValidationPipe(updatePermissionSchema))
        body: IUpdatePermissionBody,
    ) {
        try {
            const permission = await this.permissionService.updatePermission(
                id,
                body,
            );
            return new SuccessResponse(permission);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    @Roles(Role.ADMIN)
    async deletePermission(@Param('id') id: number) {
        try {
            const result = await this.permissionService.deletePermission(id);
            return new SuccessResponse(result);
        } catch (error) {
            throw error;
        }
    }
}
