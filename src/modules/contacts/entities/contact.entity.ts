import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  constructor(username: string = '', phone: string = '', email: string = '') {
    this.username = username;
    this.phone = phone;
    this.email = email;
  }
}
