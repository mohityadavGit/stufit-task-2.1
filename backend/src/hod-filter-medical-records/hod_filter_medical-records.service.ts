import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { queryDto } from './dto/filter-records.dto';
import { Request } from 'express';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  async getFilteredRecords(query: queryDto, detailed = false, req?: Request) {
    const where: any = {};

    // School name from query param or cookies (no localStorage in backend)
    const schoolName = query.schoolName || req?.cookies?.schoolName;

    // Date range filter
    if (query.startDate && query.endDate) {
      where.date_identified = {
        gte: new Date(query.startDate),
        lte: new Date(query.endDate),
      };
    }

    // School filter
    if (schoolName) {
      where.student = {
        school: {
          school_name: schoolName,
        },
      };
    }

    // Fetch matching defects with student and school relation
    const defects = await this.prisma.studentHealthDefect.findMany({
      where,
      include: {
        student: {
          include: {
            school: true,
          },
        },
      },
    });

    // Session filter
    let filteredDefects = defects;
    if (
      query.session &&
      ['JAN-JUNE', 'JULY-DEC'].includes(query.session.toUpperCase())
    ) {
      const targetSession = query.session.toUpperCase();
      filteredDefects = defects.filter((defect) => {
        const month = defect.date_identified.getMonth();
        const session = month < 6 ? 'JAN-JUNE' : 'JULY-DEC';
        return session === targetSession;
      });
    }

    // Year filter
    if (query.year) {
      filteredDefects = filteredDefects.filter(
        (defect) =>
          defect.date_identified.getFullYear().toString() === query.year,
      );
    }

    // Count unique students
    const uniqueStudentsIds = new Set(filteredDefects.map((d) => d.student_id));
    const totalStudents = uniqueStudentsIds.size;

    if (detailed) {
      return this.getDetailedCounts(filteredDefects, totalStudents);
    } else {
      return this.getSummaryCounts(filteredDefects, totalStudents);
    }
  }

  private getSummaryCounts(defects: any[], totalStudents: number) {
    const summaryCounts = {
      total_students: totalStudents,
      vision: 0,
      hearing: 0,
      dental: 0,
      physical_fitness: 0,
      nutritional: 0,
      respiratory: 0,
      skin: 0,
      posture: 0,
    };

    defects.forEach((defect) => {
      const defectType = defect.defect_type.toLowerCase();

      switch (defectType) {
        case 'vision':
          summaryCounts.vision++;
          break;
        case 'hearing':
          summaryCounts.hearing++;
          break;
        case 'dental':
          summaryCounts.dental++;
          break;
        case 'physical fitness':
          summaryCounts.physical_fitness++;
          break;
        case 'nutritional':
          summaryCounts.nutritional++;
          break;
        case 'respiratory':
          summaryCounts.respiratory++;
          break;
        case 'skin':
          summaryCounts.skin++;
          break;
        case 'posture':
          summaryCounts.posture++;
          break;
      }
    });

    return summaryCounts;
  }

  private getDetailedCounts(defects: any[], totalStudents: number) {
  const detailedCounts: any = { totalStudents };

  for (const defect of defects) {
    const defectType = defect.defect_type.toLowerCase();
    const details = defect.defect_details;

    if (!detailedCounts[defectType]) {
      detailedCounts[defectType] = {};
    }

    if (details && typeof details === 'object') {
      for (const key in details) {
        const value = details[key];
        const partKey = `${key}: ${value}`; // e.g. "left_eye: Blurry"

        if (!detailedCounts[defectType][partKey]) {
          detailedCounts[defectType][partKey] = 0;
        }

        detailedCounts[defectType][partKey]++;
      }
    }
  }

  return detailedCounts;
}

}
