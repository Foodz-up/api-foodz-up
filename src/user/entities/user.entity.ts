import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

const argon = require('argon2');
// import Role from './user.role.js';

enum Role {
  User = 0,
  Driver = 1,
  Restaurateur = 2,
  Administrateur = 3,
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @Column({ default: Role.User })
  role: Role;

  @ApiProperty()
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty()
  @Column({ nullable: true })
  refreshTokenExpires: string;

  @ApiProperty()
  @Column({ nullable: true })
  cityCode: number;

  @ApiProperty()
  @Column({ nullable: true })
  sponsorCode: string;

  @ApiProperty()
  @Column({ nullable: true })
  picture: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password, 10);
  }
}
