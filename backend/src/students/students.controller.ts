import { Controller, Get, Body, UseGuards, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDetailsDto } from './dto/student-details.dto';

// @UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('details')
  getStudentDetails(@Query() dto: StudentDetailsDto) {
    return this.studentsService.getStudentDetails(dto);
  }

  @Get('all')
  async getAllStudents() {
    return this.studentsService.getAllStudentsForSuperAdmin();
  }
}
