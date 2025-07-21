import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentDetailsDto } from './dto/student-details.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getStudentDetails({ studentId }: StudentDetailsDto) {
    // Check if student exists in database
    // If yes, fetch student details along with defects and school information
    const student = await this.prisma.student.findUnique({
      where: { student_id: studentId },
      select: {
        username: true,
        email: true,
        full_name: true,
        adhar_number: true,
        defects: {
          select: {
            defect_type: true,
            affected_body_part: true,
            defect_details: true,
            severity: true,
            date_identified: true,
          },
        },
        school: {
          select: { school_name: true },
        },
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    // Return student details along with defects and school information
    return student;
  }
}
