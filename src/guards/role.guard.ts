import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const actions = context.switchToHttp().getRequest().user;

    const action = this.reflector.get<string>('action', context.getHandler());

    if (!actions || !Array.isArray(actions) || !actions.includes(action)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
