import { IsOptional, IsString } from "class-validator";

export class ParentDetailsDto {
  @IsString()
  parentId: string;
  
  @IsOptional()
  @IsString()
  childId?: string;
}