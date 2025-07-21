import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { queryDto } from "./dto/filter-records.dto";
import { Request } from 'express'; // Import Request from express
import * as cookieParser from 'cookie-parser';


@Injectable()
export class MedicalRecordsService {
        constructor(private prisma: PrismaService) { }

    async getFilteredRecords(query: queryDto, detailed=false,req?:Request) {
        //create an empty array for query
        const where: any ={};

        /*Extracting school name from anywhere */
        /*If you want to extract it from Local Storage */
        const schoolNameFromStorage = typeof window !== 'undefined' 
        ? localStorage.getItem('schoolName') 
        : null;

        /*If you want to extract it from cookies */
        
        const schoolName = query.schoolName || schoolNameFromStorage || req?.cookies?.schoolName;


        //date range filter
        if (query.startDate && query.endDate) {
            where.date_identified ={
                gte: new Date(query.startDate),
                lte:new Date(query.endDate)
            };
        }

        //school filter
        if(schoolName){
            //getting student from studenthealthdefect table
            where.student ={
                //look for school relation in students table
                school :{
                    school_name:query.schoolName
                }
            }
        }

        //get all defects that match the filter
        const defects= await this.prisma.studentHealthDefect.findMany({
            where, 
            include:{
                student:{
                    include:{
                        school:true
                    }
                }
            }
        });

        //filter for session
        let filteredDefects = defects;
        if (query.session?.toUpperCase()) {
            const targetSession = query.session.toUpperCase();
            filteredDefects = defects.filter(defect => {
                const month = defect.date_identified.getMonth();
                const session = month < 6 ? 'JAN-JUNE' : 'JULY-DEC';
                return session === targetSession;
            });
        }

        //filter by year if provided
        if(query.year){
            filteredDefects = filteredDefects.filter(defect=>{
                return defect.date_identified.getFullYear().toString()===query.year
            });
        }

        //count unique studnets
        const uniqueStudentsIds = new Set(filteredDefects.map(d => d.student_id));
        const totalStudents = uniqueStudentsIds.size;

        if(detailed){
            return this.getDetailedCounts(filteredDefects, totalStudents);
        }
        else{
            return this.getSummaryCounts(filteredDefects,totalStudents);
        }
    }

    //return an oveall summary
    private getSummaryCounts(defects:any[], totalStudents:number){
        const summaryCounts={
            total_students:totalStudents,
            vision:0,
            hearing:0,
            dental:0,
            physical_fitness:0,
            nutritional:0,
            respiratory:0,
            skin:0,
            posture:0
        };
        defects.forEach(defect=>{
            const details = defect.defect_details as any;
            const defectType = defect.defect_type.toLowerCase();

            switch(defectType){
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

    //return an detailed summary
    private getDetailedCounts(defect: any[], totalStudents:number){
        const detailedDefecCounts={
            totalStudents:totalStudents,
            vision:{
                left_eye:0,
                right_eye:0,
                color_vision:0
            },
            hearing:{
                left_ear:0,
                right_ear:0,
                ear_wax:0
            },
            dental:{
                cavities:0,
                aligment:0,
                gum_health:0
            },
            physical_fitness:{
                posture:0,
                lower_limb:0,
                upper_lower_limb:0,
                strength:0,
                endurance:0,
                flexibility:0
            },
            nutritional:{
                bmi:0,
                vitamin_d:0,
                hemoglobin:0
            },
            respiratory:{
                allergies:0,
                breathing:0,
                peak_flow:0
            }, 
            skin:{
                condition:0,
                severity:0,
            },
            posture:{
                curvature:0,
                flexibility:0,
                shoulder_alignment:0
            },
        };
        defect.forEach(defect =>{
            const details = defect.defect_details as any;
            const defectType = defect.defect_type.toLowerCase();

            switch(defectType){
                case 'vision':
                    if (details.left_eye && details.left_eye!=='Normal') {
                        detailedDefecCounts.vision.left_eye++;
                    }
                    if (details.right_eye && details.left_eye!=='Normal') {
                        detailedDefecCounts.vision.left_eye++;
                    }
                    if (details.color_vision && details.color_vision!=='Normal') {
                        detailedDefecCounts.vision.color_vision++;
                    }
                    break;
                case 'hearing':
                    if (details.left_ear && details.left_ear!=='Normal') {
                        detailedDefecCounts.vision.left_eye++;
                    }
                    if (details.right_ear && details.right_ear!=='Normal') {
                        detailedDefecCounts.vision.left_eye++;
                    }
                    if (details.ear_wax && details.ear_wax==='Excessive' || details.ear_wax ==='Moderate') {
                        detailedDefecCounts.hearing.ear_wax++;
                    }
                    break;
                case 'dental':
                    if (details.cavities && details.cavities>0) {
                        detailedDefecCounts.dental.cavities++;
                    }
                    if(details.aligment && details.aligment!=='Normal'){
                        detailedDefecCounts.dental.aligment++;
                    }
                    if (details.gum_health && details.gum_health !== 'Healthy'){
                        detailedDefecCounts.dental.gum_health++;
                    }
                    break;
                case 'physical fitness':
                    if (details.posture && details.posture==='Bad posture') {
                        detailedDefecCounts.physical_fitness.posture++;
                    }
                    if (details.lower_limb  && details.lower_limb ==='Dystrophy') {
                        detailedDefecCounts.physical_fitness.lower_limb++;
                    }
                    if (details.upper_lower_limb  && details.upper_lower_limb ==='Limited range of motion') {
                        detailedDefecCounts.physical_fitness.upper_lower_limb++;
                    }
                    if (details.strength && details.strength ==='Below average') {
                        detailedDefecCounts.physical_fitness.strength++;
                    }
                    if (details.endurance && details.endurance ==='Below average') {
                        detailedDefecCounts.physical_fitness.endurance++;
                    }
                    if (details.flexibility && details.flexibility ==='Poor') {
                        detailedDefecCounts.physical_fitness.flexibility++;
                    }
                    break;
                case 'nutritional':
                    if(details.bmi && (details.bmi === 'Underweight' || details.bmi === 'Overweight')){
                        detailedDefecCounts.nutritional.bmi++;
                    } 
                    if (details.vitamin_d && (details.vitamin_d === 'Deficient' || details.vitamin_d === 'Insufficient')) {
                        detailedDefecCounts.nutritional.vitamin_d++;
                    }
                    if(details.hamoglobin && parseFloat(details.hemoglobin)<12){
                        detailedDefecCounts.nutritional.hemoglobin++;
                    }
                    break;
                case 'respiratory':
                    if(details.allergies){
                        detailedDefecCounts.respiratory.allergies++;
                    }
                    if (details.breathing && details.breathing === 'Mild asthma') {
                        detailedDefecCounts.respiratory.breathing++;
                    }
                    if (details.peak_flow && details.peak_flow==='Below average') {
                        detailedDefecCounts.respiratory.peak_flow++;
                    }
                    break;
                case 'skin':
                    if (details.condition && details.condition !== 'Healthy') {
                        detailedDefecCounts.skin.condition++;
                    }
                    if (details.severity && details.severity!=='None') {
                        detailedDefecCounts.skin.severity++;
                    }
                    break;
                case 'posture':
                    if (details.curvature && details.curvature !=='Normal') {
                        detailedDefecCounts.posture.curvature++;
                    }
                    if (details.flexibility && details.flexibility === 'Reduced') {
                        detailedDefecCounts.posture.flexibility++;
                    }
                    if (details.shoulder_alignment && details.shoulder_alignment==='Uneven') {
                        detailedDefecCounts.posture.shoulder_alignment++;
                    }
                    break;
                }
            });
        return detailedDefecCounts;
    }

}
