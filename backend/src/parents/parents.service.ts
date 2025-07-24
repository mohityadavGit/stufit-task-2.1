import { BadRequestException, Body, ConflictException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParentDetailsDto } from './dto/parents.dto';
import { addChildrenDto } from './dto/addChildren.dto';
import { error } from 'console';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async addChildrenDetails(@Body() dto:addChildrenDto){
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
        parent_id: "123456789abccd", //to be changed
      },
      include: {
        parent: true, 
        school: true,
      },
    });

    if(!updatedStudent){
        throw new BadRequestException("something went wrong while updating children");
    }

    return { message: 'Child details added successfully' };
  };

  async getParentDetails(@Query() dto: ParentDetailsDto) {
    // Base query to get parent with children
    const query = {
      where: { parent_id: dto.parentId },
      include: {
        children: {
          include: {
            school: {
              select: {
                school_name: true
              }
            },
            defects: {
              select: {
                defect_type: true,
                severity: true,
                date_identified: true
              }
            }
          },
          // Apply child filter if provided
          ...(dto.childId && { where: { student_id: dto.childId } })
        }
      }
    };

    const parentWithChildren = await this.prisma.parent.findUnique(query);

    if (!parentWithChildren) {
      throw new Error('Parent not found');
    }

    // Transform the data for frontend consumption
    return {
      parent: {
        id: parentWithChildren.parent_id,
        name: parentWithChildren.full_name,
        email: parentWithChildren.email,
        phone: parentWithChildren.phone_number
      },
      children: parentWithChildren.children.map(child => ({
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
        healthDefects: child.defects.map(defect => ({
          type: defect.defect_type,
          severity: defect.severity,
          dateIdentified: defect.date_identified
        }))
      }))
    };
  }
}