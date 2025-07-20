import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignupStudentDto {
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
  @IsString()
  adhar_number: string;

  @IsNotEmpty()
  @IsNumber()
  school_id: number;
}
