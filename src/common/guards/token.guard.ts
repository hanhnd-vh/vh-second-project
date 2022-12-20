import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConfigKey } from '../config';
import { UserToken } from '../interfaces';

export abstract class TokenGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = this.getRequest(context);

        try {
            const token = this.getToken(request);
            const user = this.verifyToken(token);
            request.user = user;
            return true;
        } catch (e) {
            return false;
        }
    }

    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }

    getToken(request: { headers: Record<string, string | string[]> }): string {
        const authorization = request.headers['authorization'];
        if (!authorization || Array.isArray(authorization)) {
            throw new Error('Invalid Authorization Header');
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            throw new Error('Invalid token');
        }
        return token;
    }

    verifyToken(token: string): UserToken {
        return this.jwtService.verify(token, {
            secret: this.configService.get<string>(
                ConfigKey.JWT_ACCESS_TOKEN_SECRET,
            ),
        });
    }
}
