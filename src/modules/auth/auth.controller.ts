import { Controller, Inject, Get, Post, Body, HttpStatus, Req, Res, Next, Param, Response } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService, User } from '../entities';

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {}
    
    @Post('register')
    async registerNewUser(@Body() data: User) {
        try {
            const token = await this.userService.register(data);
            return token;
        } catch (err) {
            console.trace(err);
            return null;
        }
    }
    
    @Post('login')
    async login(@Req() req, @Res() res, @Body() body) {
        if (!body || !('userName' in body && 'password' in body)) {
            res.status(HttpStatus.BAD_REQUEST);
            return res.send('must put userName and password in request body');
        }
        try {
            const {userName, password} = body;
            const token = await this.userService.login(userName, password);
            res.status(HttpStatus.ACCEPTED)
                .json(token);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST);
            return res.send(err);
        }

    }

    @Get('logins')
    sendSecretToken(@Req() req, @Res() res, @Next() next) {
        jwt.verify(req.token, process.env.SECRET_HASH_KEY, (err, data) => {
            if (err) {
                res.status(HttpStatus.FORBIDDEN);
                res.end();
            } else {
                res.json({
                    text: 'this is protected',
                    data
                });
            } 
        });
    }
}