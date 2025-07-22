import { IsString } from "class-validator";

export class StudentDetailsDto {
  @IsString()
  studentId: string;
}