import { Column, Entity, PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate } from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logInsert(){
        console.log('User insert successful with id',this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log('User remove successful with id',this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log('User update successful with id',this.id)
    }

    
}