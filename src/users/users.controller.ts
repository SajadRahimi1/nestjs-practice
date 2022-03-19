import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) { };
    @Post('signup')
    createUser(@Body() body: CreateUserDTO) {
        console.log(body);
        this.userService.createUser(body.email, body.password);
    }
}
