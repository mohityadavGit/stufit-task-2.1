import { Module } from '@nestjs/common';
import { MedicalRecordsController } from './hod_filter_medical-records.controller';
import { MedicalRecordsService } from './hod_filter_medical-records.service';

@Module({
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService]
})
export class MedicalRecordsModule {}
