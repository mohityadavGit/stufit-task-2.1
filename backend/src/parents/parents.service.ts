import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParentDetailsDto } from './dto/parents.dto';
import { addChildrenDto } from './dto/addChildren.dto';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async addChildrenDetails(@Query() dto: addChildrenDto) {
    // 1. Find student by Aadhaar number
    const student = await this.prisma.student.findUnique({
      where: { adhar_number: dto.childAdhaar },
    });

    if (!student) {
      throw new NotFoundException('Student with provided Aadhaar not found');
    }

    // 2. Check if student already has a parent
    if (student.parent_id) {
      throw new ConflictException('Student already has a parent assigned');
    }

    // 3. Update the student's parent_id
    const updatedStudent = await this.prisma.student.update({
      where: { adhar_number: dto.childAdhaar },
      data: {
        parent_id: "123456789abccd", // Replace with real parent_id from auth/session
      },
      include: {
        parent: true,
        school: true,
      },
    });

    if (!updatedStudent) {
      throw new BadRequestException('Something went wrong while updating child');
    }

    return { message: 'Child details added successfully' };
  }

  async getParentDetails(@Query() dto: ParentDetailsDto) {
    const parentWithChildren = await this.prisma.parent.findUnique({
      where: { parent_id: dto.parentId },
      include: {
        children: {
          where: dto.childId ? { student_id: dto.childId } : undefined,
          include: {
            school: {
              select: {
                school_name: true,
              },
            },
            defects: {
              select: {
                defect_type: true,
                severity: true,
                date_identified: true,
              },
            },
          },
        },
      },
    });

    if (!parentWithChildren) {
      throw new NotFoundException('Parent not found');
    }

    return {
      parent: {
        id: parentWithChildren.parent_id,
        name: parentWithChildren.full_name,
        email: parentWithChildren.email,
        phone: parentWithChildren.phone_number,
      },
      children: parentWithChildren.children.map((child) => ({
        id: child.student_id,
        name: child.full_name,
        username: child.username,
        email: child.email,
        school: child.school.school_name,
        grade: child.grade,
        gender: child.gender,
        admissionDate: child.admission_date,
        dob: child.dob,
        isActive: child.is_active,
        healthDefects: child.defects.map((defect) => ({
          type: defect.defect_type,
          severity: defect.severity,
          dateIdentified: defect.date_identified,
        })),
      })),
    };
  }
}
