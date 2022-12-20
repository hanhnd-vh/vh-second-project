import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'src/common/interfaces';

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: RequestWithUser = ctx.switchToHttp().getRequest();
        return request.userId;
    },
);
