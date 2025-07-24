import { IsOptional, IsString } from "class-validator";

export class addChildrenDto {
  @IsString()
  childAdhaar: string;
}