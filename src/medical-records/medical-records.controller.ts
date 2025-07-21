import { Controller, Get, Query, Req } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { queryDto } from './dto/filter-records.dto';
import { Request } from 'express'; // Import Request from express

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

    @Get()
    async getFilteredRecords(
    @Query() query: queryDto,
    @Query('detailed') detailed?: string,
    @Req() req?:Request
    ) {
    const isDetailed = detailed?.toLowerCase() === 'true';
    return this.medicalRecordsService.getFilteredRecords(query, isDetailed, req);
    }
}