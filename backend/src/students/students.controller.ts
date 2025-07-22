import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDetailsDto } from './dto/student-details.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('details') 
  getStudentDetails(@Body() dto: StudentDetailsDto) {
    return this.studentsService.getStudentDetails(dto);
  }
}
