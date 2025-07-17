import { IsEmail, IsNotEmpty, MinLength, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class SignupHodDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  full_name?: string;

  @IsNumber()
  @IsPositive()
  school_id: number;
}
