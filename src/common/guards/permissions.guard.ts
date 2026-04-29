import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../enums/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
            PERMISSIONS_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredPermissions) {
            return true;
        }

    const request = context.switchToHttp().getRequest<{ user?: { permissions?: Permission[] } }>();
    const user = request.user;

    if (!user || !user.permissions || !Array.isArray(user.permissions)) {
      return false;
    }

    return requiredPermissions.every((permission) =>
      user.permissions!.includes(permission)
    );
  }
}
