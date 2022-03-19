import { Column, Entity, PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
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