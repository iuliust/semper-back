import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get('all')
    getAll() {
        return [
            {
                name: 'zorg',
                emailAddress: 'zorg@baddies.ga'
            }
        ];
    }
}