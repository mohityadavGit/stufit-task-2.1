import { Controller, Get, Query } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { queryDto } from './dto/filter-records.dto';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

    @Get()
    async getFilteredRecords(
    @Query() query: queryDto,
    @Query('detailed') detailed?: string
    ) {
    const isDetailed = detailed?.toLowerCase() === 'true';
    return this.medicalRecordsService.getFilteredRecords(query, isDetailed);
    }
}