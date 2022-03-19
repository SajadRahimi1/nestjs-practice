import { Controller,Post,Get,Body,Param } from '@nestjs/common';
import {CreateUserDTO} from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post('signup')
    createUser(@Body() body:CreateUserDTO){
        console.log(body);
    }
}
