import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  session?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  admission_date?: string;

  @IsOptional()
  @IsDateString()
  dob?: string; 
}
