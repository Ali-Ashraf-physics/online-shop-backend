import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest<TUser>(err: unknown, user: TUser | false | null): TUser {
        if (err || !user) {
            throw err instanceof Error ? err : new UnauthorizedException('Authentication required');
        }
        return user;
    }
}
