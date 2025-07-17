import { IsEmail, IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class SignupStudentDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  adhar_number: string;

  @IsNumber()
  school_id: number;
}
