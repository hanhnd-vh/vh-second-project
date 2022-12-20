import {
    CanActivate,
    ExecutionContext,
    Inject,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';
import { Observable } from 'rxjs';
import { Permission, Role } from '../constants';
import { MetaDataKey } from '../decorators/meta-data-key';
import { RequestWithUser } from '../interfaces';
export class AuthorizationGuard implements CanActivate {
    constructor(@Inject(Reflector) private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request: RequestWithUser = this.getRequest(context);
            const requiredRoles =
                this.reflector.getAllAndOverride<Role[]>(MetaDataKey.ROLES, [
                    context.getHandler(),
                    context.getClass(),
                ]) || [];

            const requiredPermissions =
                this.reflector.getAllAndOverride<Permission[]>(
                    MetaDataKey.PERMISSIONS,
                    [context.getHandler(), context.getClass()],
                ) || [];

            return (
                this.checkRequiredRoles(
                    (request.roles as Role[]) || [],
                    requiredRoles,
                ) &&
                this.checkRequiredPermissions(
                    (request.permissions as Permission[]) || [],
                    requiredPermissions,
                )
            );
        } catch (error) {
            throw error;
        }
    }

    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }

    checkRequiredRoles(userRoles: Role[], roles: Role[]) {
        // this route doesn't require any role => allow
        if (!roles.length) return true;

        const intersectionRoles = intersection(roles, userRoles);
        if (intersectionRoles.length === 0) {
            // this user doesn't have required roles
            throw new UnauthorizedException(
                'You have no permission on this site',
            );
        }
        return true;
    }

    checkRequiredPermissions(
        userPermissions: Permission[],
        permissions: Permission[],
    ) {
        // this route doesn't require any permissions => allow
        if (!permissions.length) return true;

        const intersectionPermissions = intersection(
            permissions,
            userPermissions,
        );
        if (intersectionPermissions.length < permissions.length) {
            // this user doesn't have required permissions
            throw new UnauthorizedException(
                'You have no permission on this site',
            );
        }
        return true;
    }
}
