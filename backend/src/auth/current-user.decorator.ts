import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Token } from './token';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as Token;
  },
);
