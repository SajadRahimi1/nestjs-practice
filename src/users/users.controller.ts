import { Controller, Post, Get, Body, Param, Patch, Query, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { };
    @Post('signup')
    createUser(@Body() body: CreateUserDTO) {
        return this.authService.signup(body.email, body.password);
    }

    @UseInterceptors(ClassSerializerInterceptor)

    @Get("/:id")
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete()
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
}
