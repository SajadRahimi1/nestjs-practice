import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from './users.service';
import {randomBytes,scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';

const scrypt =promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async signup(email:string,password:string){
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException("ایمیل قبلا استفاده شده است");
        }

        // generate the salt
        const salt = randomBytes(8).toString('hex');

        // hash password with salt key
        const hash = (await scrypt(password,salt,25)) as Buffer;

        // concat key and hashed password together
        const result = salt+"."+hash.toString('hex');

        // create user
        const user = await this.userService.createUser(email,result);
    }


    async signin(email:string,password:string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException('کاربری یافت نشد');
        }

        const [key,storedHash] = user.password.split('.');

        const hash = (await scrypt(password,key,25)) as Buffer;

        if(storedHash!==hash.toString('hex')){
            throw new BadRequestException("پسورد درست نیست");
        }
        return user;
        
    }
}