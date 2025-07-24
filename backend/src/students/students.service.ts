import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentDetailsDto } from './dto/student-details.dto';
import { calculateAge } from 'src/common/utils/date-phase.util';

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
        grade:true,
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

  async getAllStudentsForSuperAdmin() {
    const students = await this.prisma.student.findMany({
      include: {
        school: true,
        defects: true,
      },
    });

    return students.map((student) => {
      const defects: any = {};
      for (const defect of student.defects) {
        const details = defect.defect_details;
        let subType = '';
        if (details && typeof details === 'object') {
          const keys = Object.keys(details);
          if (keys.length > 0) {
            subType = keys[0];
          }
        }
        switch (defect.defect_type.toLowerCase()) {
          case 'vision':
          case 'eye':
            defects.eye = { subType: subType || 'myopia' };
            break;
          case 'dental':
            defects.dental = { subType: subType || 'gingivitis' };
            break;
          case 'fitness':
            defects.fitness = { subType: subType || 'underweight' };
            break;
          case 'psychological':
            defects.psychological = { subType: subType || 'anxiety' };
            break;
          case 'orthopedic':
            defects.orthopedic = { subType: subType || 'flatfoot' };
            break;
          case 'hearing':
            defects.hearing = { subType: subType || 'mild' };
            break;
          case 'ent':
            defects.ent = { subType: subType || 'sinusitis' };
            break;
          case 'posture':
            defects.orthopedic = { subType: 'scoliosis' };
            break;
          // Add more mappings as needed
        }
      }

      return {
        id: student.student_id,
        name: student.full_name,
        grade: student.grade || '',
        age: student.dob ? calculateAge(student.dob) : null,
        gender: student.gender || 'Other',
        school: student.school?.school_name || '',
        session: student.session || '',
        admission_date: student.admission_date ? student.admission_date.toISOString() : undefined,
        date: student.admission_date ? student.admission_date.toISOString().split('T')[0] : '',
        defects,
      };
    });
  }
}
