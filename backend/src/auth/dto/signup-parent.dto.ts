// src/auth/dto/signup-parent.dto.ts

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupParentDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phone_number?: string;
}
