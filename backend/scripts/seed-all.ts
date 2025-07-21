import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    // Create 5 schools
    prisma.school.createMany({
      data: [
        { school_name: 'Green Valley Public School' },
        { school_name: 'Sunshine International Academy' },
        { school_name: 'Mount View High School' },
        { school_name: 'Riverside Elementary' },
        { school_name: 'Horizon High' }
      ]
    }),

    // Create 18 students with explicit UUIDs
    prisma.student.createMany({
      data: [
        // School 1 students (4)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440001',
          username: 'ravi_sharma',
          email: 'ravi.sharma@example.com',
          password_hash: '$2b$10$examplehash1',
          full_name: 'Ravi Sharma',
          adhar_number: '123456789012',
          school_id: 1,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440002',
          username: 'priya_verma',
          email: 'priya.verma@example.com',
          password_hash: '$2b$10$examplehash2',
          full_name: 'Priya Verma',
          adhar_number: '234567890123',
          school_id: 1,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440003',
          username: 'amit_patel',
          email: 'amit.patel@example.com',
          password_hash: '$2b$10$examplehash3',
          full_name: 'Amit Patel',
          adhar_number: '345678901234',
          school_id: 1,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440004',
          username: 'neha_gupta',
          email: 'neha.gupta@example.com',
          password_hash: '$2b$10$examplehash4',
          full_name: 'Neha Gupta',
          adhar_number: '456789012345',
          school_id: 1,
          is_active: true
        },

        // School 2 students (4)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440005',
          username: 'rahul_singh',
          email: 'rahul.singh@example.com',
          password_hash: '$2b$10$examplehash5',
          full_name: 'Rahul Singh',
          adhar_number: '567890123456',
          school_id: 2,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440006',
          username: 'ananya_joshi',
          email: 'ananya.joshi@example.com',
          password_hash: '$2b$10$examplehash6',
          full_name: 'Ananya Joshi',
          adhar_number: '678901234567',
          school_id: 2,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440007',
          username: 'vikram_reddy',
          email: 'vikram.reddy@example.com',
          password_hash: '$2b$10$examplehash7',
          full_name: 'Vikram Reddy',
          adhar_number: '789012345678',
          school_id: 2,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440008',
          username: 'divya_malhotra',
          email: 'divya.malhotra@example.com',
          password_hash: '$2b$10$examplehash8',
          full_name: 'Divya Malhotra',
          adhar_number: '890123456789',
          school_id: 2,
          is_active: true
        },

        // School 3 students (4)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440009',
          username: 'arjun_iyer',
          email: 'arjun.iyer@example.com',
          password_hash: '$2b$10$examplehash9',
          full_name: 'Arjun Iyer',
          adhar_number: '901234567890',
          school_id: 3,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440010',
          username: 'ishita_banerjee',
          email: 'ishita.banerjee@example.com',
          password_hash: '$2b$10$examplehash10',
          full_name: 'Ishita Banerjee',
          adhar_number: '012345678901',
          school_id: 3,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440011',
          username: 'siddharth_mehta',
          email: 'siddharth.mehta@example.com',
          password_hash: '$2b$10$examplehash11',
          full_name: 'Siddharth Mehta',
          adhar_number: '112233445566',
          school_id: 3,
          is_active: true
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440012',
          username: 'tanvi_desai',
          email: 'tanvi.desai@example.com',
          password_hash: '$2b$10$examplehash12',
          full_name: 'Tanvi Desai',
          adhar_number: '223344556677',
          school_id: 3,
          is_active: true
        },

        // School 4 students (3) - inactive accounts
        {
          student_id: '550e8400-e29b-41d4-a716-446655440013',
          username: 'aditya_rao',
          email: 'aditya.rao@example.com',
          password_hash: '$2b$10$examplehash13',
          full_name: 'Aditya Rao',
          adhar_number: '334455667788',
          school_id: 4,
          is_active: false
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440014',
          username: 'pooja_choudhary',
          email: 'pooja.choudhary@example.com',
          password_hash: '$2b$10$examplehash14',
          full_name: 'Pooja Choudhary',
          adhar_number: '445566778899',
          school_id: 4,
          is_active: false
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440015',
          username: 'rohan_kapoor',
          email: 'rohan.kapoor@example.com',
          password_hash: '$2b$10$examplehash15',
          full_name: 'Rohan Kapoor',
          adhar_number: '556677889900',
          school_id: 4,
          is_active: false
        },

        // School 5 students (3) - inactive accounts
        {
          student_id: '550e8400-e29b-41d4-a716-446655440016',
          username: 'anjali_nair',
          email: 'anjali.nair@example.com',
          password_hash: '$2b$10$examplehash16',
          full_name: 'Anjali Nair',
          adhar_number: '667788990011',
          school_id: 5,
          is_active: false
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440017',
          username: 'varun_menon',
          email: 'varun.menon@example.com',
          password_hash: '$2b$10$examplehash17',
          full_name: 'Varun Menon',
          adhar_number: '778899001122',
          school_id: 5,
          is_active: false
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440018',
          username: 'shreya_pillai',
          email: 'shreya.pillai@example.com',
          password_hash: '$2b$10$examplehash18',
          full_name: 'Shreya Pillai',
          adhar_number: '889900112233',
          school_id: 5,
          is_active: false
        }
      ]
    }),

    // Create 15 health defects with actual student IDs
    prisma.studentHealthDefect.createMany({
      data: [
        // Student 1
        {
          student_id: '550e8400-e29b-41d4-a716-446655440001',
          defect_type: 'Physical Fitness',
          affected_body_part: 'Musculoskeletal System',
          defect_details: {
            posture: 'Bad posture',
            upper_lower_limb: 'Limited range of motion',
            lower_limb: 'Dystrophy'
          },
          severity: 'Severe',
          doctor_remarks: 'Physiotherapy advised; re-evaluate in 4 weeks'
        },
        // Student 2
        {
          student_id: '550e8400-e29b-41d4-a716-446655440002',
          defect_type: 'Vision',
          affected_body_part: 'Eyes',
          defect_details: {
            right_eye: '-2.0 myopia',
            left_eye: '-1.5 myopia',
            colour_vision: 'Normal'
          },
          severity: 'Moderate',
          doctor_remarks: 'Avoid long screen time'
        },
        // Student 3
        {
          student_id: '550e8400-e29b-41d4-a716-446655440003',
          defect_type: 'Hearing',
          affected_body_part: 'Ears',
          defect_details: {
            right_ear: 'Mild hearing loss',
            left_ear: 'Normal',
            ear_wax: 'Excessive'
          },
          severity: 'Mild',
          doctor_remarks: 'Regular cleaning required'
        },
        // Student 4
        {
          student_id: '550e8400-e29b-41d4-a716-446655440004',
          defect_type: 'Dental',
          affected_body_part: 'Teeth',
          defect_details: {
            cavities: 3,
            gum_health: 'Mild gingivitis',
            alignment: 'Overbite'
          },
          severity: 'Moderate',
          doctor_remarks: 'Dental cleaning recommended'
        },
        // Student 5
        {
          student_id: '550e8400-e29b-41d4-a716-446655440005',
          defect_type: 'Nutritional',
          affected_body_part: 'General',
          defect_details: {
            bmi: 'Underweight',
            hemoglobin: '10.2 g/dL',
            vitamin_d: 'Deficient'
          },
          severity: 'Moderate',
          doctor_remarks: 'Nutritional supplements needed'
        },
        // Student 6
        {
          student_id: '550e8400-e29b-41d4-a716-446655440006',
          defect_type: 'Respiratory',
          affected_body_part: 'Lungs',
          defect_details: {
            breathing: 'Mild asthma',
            allergies: 'Dust allergy',
            peak_flow: 'Below average'
          },
          severity: 'Mild',
          doctor_remarks: 'Inhaler prescribed'
        },
        // Student 7
        {
          student_id: '550e8400-e29b-41d4-a716-446655440007',
          defect_type: 'Skin',
          affected_body_part: 'Face',
          defect_details: {
            condition: 'Acne',
            severity: 'Moderate',
            affected_areas: ['Forehead', 'Cheeks']
          },
          severity: 'Moderate',
          doctor_remarks: 'Topical treatment prescribed'
        },
        // Student 8
        {
          student_id: '550e8400-e29b-41d4-a716-446655440008',
          defect_type: 'Posture',
          affected_body_part: 'Spine',
          defect_details: {
            curvature: 'Mild scoliosis',
            shoulder_alignment: 'Uneven',
            flexibility: 'Reduced'
          },
          severity: 'Mild',
          doctor_remarks: 'Posture correction exercises'
        },
        // Student 9
        {
          student_id: '550e8400-e29b-41d4-a716-446655440009',
          defect_type: 'Vision',
          affected_body_part: 'Eyes',
          defect_details: {
            right_eye: '-1.0 myopia',
            left_eye: '-0.5 myopia',
            colour_vision: 'Normal'
          },
          severity: 'Mild',
          doctor_remarks: 'Monitor annually'
        },
        // Student 10
        {
          student_id: '550e8400-e29b-41d4-a716-446655440010',
          defect_type: 'Dental',
          affected_body_part: 'Teeth',
          defect_details: {
            cavities: 1,
            gum_health: 'Healthy',
            alignment: 'Minor crowding'
          },
          severity: 'Mild',
          doctor_remarks: 'Regular brushing recommended'
        },
        // Student 11
        {
          student_id: '550e8400-e29b-41d4-a716-446655440011',
          defect_type: 'Physical Fitness',
          affected_body_part: 'General',
          defect_details: {
            endurance: 'Below average',
            strength: 'Average',
            flexibility: 'Poor'
          },
          severity: 'Mild',
          doctor_remarks: 'Regular physical activity needed'
        },
        // Student 12
        {
          student_id: '550e8400-e29b-41d4-a716-446655440012',
          defect_type: 'Hearing',
          affected_body_part: 'Ears',
          defect_details: {
            right_ear: 'Normal',
            left_ear: 'Normal',
            ear_wax: 'Moderate'
          },
          severity: 'None',
          doctor_remarks: 'Routine cleaning recommended'
        },
        // Student 13
        {
          student_id: '550e8400-e29b-41d4-a716-446655440013',
          defect_type: 'Nutritional',
          affected_body_part: 'General',
          defect_details: {
            bmi: 'Overweight',
            hemoglobin: '12.8 g/dL',
            vitamin_d: 'Insufficient'
          },
          severity: 'Mild',
          doctor_remarks: 'Balanced diet recommended'
        },
        // Student 14
        {
          student_id: '550e8400-e29b-41d4-a716-446655440014',
          defect_type: 'Vision',
          affected_body_part: 'Eyes',
          defect_details: {
            right_eye: '-0.75 myopia',
            left_eye: '-0.25 myopia',
            colour_vision: 'Normal'
          },
          severity: 'Mild',
          doctor_remarks: 'Monitor vision'
        },
        // Student 15
        {
          student_id: '550e8400-e29b-41d4-a716-446655440015',
          defect_type: 'Dental',
          affected_body_part: 'Teeth',
          defect_details: {
            cavities: 0,
            gum_health: 'Healthy',
            alignment: 'Normal'
          },
          severity: 'None',
          doctor_remarks: 'Continue good oral hygiene'
        }
      ]
    }),

    // Create 3 admin accounts
    prisma.adminLogin.createMany({
      data: [
        {
          admin_id: '110e8400-e29b-41d4-a716-446655440001',
          username: 'super_admin',
          email: 'superadmin@school.com',
          password_hash: '$2b$10$adminhash1',
          full_name: 'Super Administrator',
          role: 'SUPER_ADMIN',
          is_active: true,
          school_id: null
        },
        {
          admin_id: '110e8400-e29b-41d4-a716-446655440002',
          username: 'school1_admin',
          email: 'admin@school1.com',
          password_hash: '$2b$10$adminhash2',
          full_name: 'School 1 Administrator',
          role: 'ADMIN',
          is_active: true,
          school_id: 1
        },
        {
          admin_id: '110e8400-e29b-41d4-a716-446655440003',
          username: 'school2_admin',
          email: 'admin@school2.com',
          password_hash: '$2b$10$adminhash3',
          full_name: 'School 2 Administrator',
          role: 'ADMIN',
          is_active: true,
          school_id: 2
        }
      ]
    })
  ]);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });