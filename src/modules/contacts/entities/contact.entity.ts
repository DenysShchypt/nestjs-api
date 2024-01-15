import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
  constructor(username: string = '', phone: string = '', email: string = '') {
    this.username = username;
    this.phone = phone;
    this.email = email;
  }
}
