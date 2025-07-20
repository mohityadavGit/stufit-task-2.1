import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignupHodDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsNumber()
  school_id: number;
}
