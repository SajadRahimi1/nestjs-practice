import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) { };

    createUser(email: string, password: string) {
        const user = this.repository.create({ email, password });

        return this.repository.save(user);
    }

    findOne(id:number){
        return this.repository.findOne({where:{id}}); 
    }

    find(email:string){
        return this.repository.find({where:{email}});
    }

    async update(id:number, attrs:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new Error('user not found');
        }
        Object.assign(user,attrs);
        return this.repository.save(user);
    }

    remove(){}
}
