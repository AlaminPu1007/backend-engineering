/*
  Use a [Guards](https://docs.nestjs.com/guards) for authentication and authorization: it can check route metadata
  and decide whether the request is allowed to continue. Middleware is better
  suited to general request processing, such as logging.
*/

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== (process.env.API_KEY || 'my-secret-api-key')) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
