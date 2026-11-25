/*
  This is a custom interceptor that can be used to transform the response data before sending it back to the client. 
  It implements the NestInterceptor interface and overrides the intercept method. 
  The intercept method takes in the ExecutionContext and CallHandler as parameters, 
  and returns an Observable that represents the transformed response data.

  To install the required dependencies for this interceptor, you can run the following command in your terminal:
  nest g interceptor utils/transform --flat
*/
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const res = context.switchToHttp().getResponse<Response>();
    const statusCode = res.statusCode ?? 200;

    return next.handle().pipe(
      map((data: T) => {
        return {
          status: true,
          statusCode: statusCode,
          data: data,
          message: 'Success',
        };
      }),
    );
  }
}
