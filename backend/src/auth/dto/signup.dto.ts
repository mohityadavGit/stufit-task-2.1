// signup.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';

export enum Role {
  HOD = 'HOD',
}

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(Role)
  role: Role;

  @IsInt()
  school_id: number;
}
