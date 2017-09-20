import { ExpressMiddleware, HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Middleware()
export class EnsureTokenMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
        jwt.verify(req.token, 'this is the secret passcode', (err, data) => {
            if (err) {
                res.status(HttpStatus.FORBIDDEN);
                res.end();
            } else {
                req.secureData = {data};
                next();
            } 
        });
    };
 }
}