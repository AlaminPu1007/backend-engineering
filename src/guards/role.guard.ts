import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const role = req.headers['role'];
    console.log(role, 'Role');

    if (!role || role !== 'admin') {
      throw new UnauthorizedException(
        'You do not have the required role to access this resource',
      );
    }

    return true;
  }
}
