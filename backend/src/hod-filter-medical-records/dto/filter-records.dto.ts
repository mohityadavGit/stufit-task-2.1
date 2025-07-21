import { IsOptional, IsString } from 'class-validator';

export class queryDto {
  @IsOptional()
  @IsString()
  phase?: string;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  @IsString()
  schoolName?: string;

  @IsOptional()
  @IsString()
  session?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  detailed?: string; 
}