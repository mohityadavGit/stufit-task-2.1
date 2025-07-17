import { IsEmail, IsNotEmpty, MinLength,IsNumber } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNumber()
  school_id: number;
   
  full_name?: string;
}
