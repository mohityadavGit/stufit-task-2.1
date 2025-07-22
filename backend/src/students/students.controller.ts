import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDetailsDto } from './dto/student-details.dto';

// @UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('details')
  getStudentDetails(@Body() dto: StudentDetailsDto) {
    return this.studentsService.getStudentDetails(dto);
  }

  @Get('all')
  async getAllStudents() {
    return this.studentsService.getAllStudentsForSuperAdmin();
  }
}
