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

    // Create 10 parents (enough for 18 students with random distribution)
    prisma.parent.createMany({
      data: [
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440001',
          full_name: 'Rajesh Sharma',
          email: 'rajesh.sharma@example.com',
          phone_number: '9876543210'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440002',
          full_name: 'Sunita Verma',
          email: 'sunita.verma@example.com',
          phone_number: '8765432109'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440003',
          full_name: 'Vikram Patel',
          email: 'vikram.patel@example.com',
          phone_number: '7654321098'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440004',
          full_name: 'Neeta Gupta',
          email: 'neeta.gupta@example.com',
          phone_number: '6543210987'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440005',
          full_name: 'Amit Singh',
          email: 'amit.singh@example.com',
          phone_number: '5432109876'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440006',
          full_name: 'Priya Joshi',
          email: 'priya.joshi@example.com',
          phone_number: '4321098765'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440007',
          full_name: 'Rahul Malhotra',
          email: 'rahul.malhotra@example.com',
          phone_number: '3210987654'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440008',
          full_name: 'Anjali Reddy',
          email: 'anjali.reddy@example.com',
          phone_number: '2109876543'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440009',
          full_name: 'Sanjay Iyer',
          email: 'sanjay.iyer@example.com',
          phone_number: '1098765432'
        },
        {
          parent_id: '660e8400-e29b-41d4-a716-446655440010',
          full_name: 'Meena Banerjee',
          email: 'meena.banerjee@example.com',
          phone_number: '0987654321'
        }
      ]
    }),

    // Create 18 students with parent assignments
    prisma.student.createMany({
      data: [
        // Parent 1's children (3)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440001',
          username: 'ravi_sharma',
          email: 'ravi.sharma@example.com',
          password_hash: '$2b$10$examplehash1',
          full_name: 'Ravi Sharma',
          adhar_number: '123456789012',
          school_id: 1,
          is_active: true,
          session: '2023-2024',
          grade: '10',
          gender: 'Male',
          admission_date: new Date('2020-06-15'),
          dob: new Date('2007-05-10'),
          parent_id: '660e8400-e29b-41d4-a716-446655440001'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440002',
          username: 'priya_sharma',
          email: 'priya.sharma@example.com',
          password_hash: '$2b$10$examplehash2',
          full_name: 'Priya Sharma',
          adhar_number: '234567890123',
          school_id: 1,
          is_active: true,
          session: '2023-2024',
          grade: '8',
          gender: 'Female',
          admission_date: new Date('2022-06-25'),
          dob: new Date('2009-03-18'),
          parent_id: '660e8400-e29b-41d4-a716-446655440001'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440003',
          username: 'arjun_sharma',
          email: 'arjun.sharma@example.com',
          password_hash: '$2b$10$examplehash3',
          full_name: 'Arjun Sharma',
          adhar_number: '345678901234',
          school_id: 2,
          is_active: true,
          session: '2023-2024',
          grade: '5',
          gender: 'Male',
          admission_date: new Date('2023-06-30'),
          dob: new Date('2012-09-12'),
          parent_id: '660e8400-e29b-41d4-a716-446655440001'
        },

        // Parent 2's children (2)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440004',
          username: 'neha_verma',
          email: 'neha.verma@example.com',
          password_hash: '$2b$10$examplehash4',
          full_name: 'Neha Verma',
          adhar_number: '456789012345',
          school_id: 1,
          is_active: true,
          session: '2023-2024',
          grade: '9',
          gender: 'Female',
          admission_date: new Date('2021-06-20'),
          dob: new Date('2008-07-15'),
          parent_id: '660e8400-e29b-41d4-a716-446655440002'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440005',
          username: 'rohan_verma',
          email: 'rohan.verma@example.com',
          password_hash: '$2b$10$examplehash5',
          full_name: 'Rohan Verma',
          adhar_number: '567890123456',
          school_id: 2,
          is_active: true,
          session: '2023-2024',
          grade: '12',
          gender: 'Male',
          admission_date: new Date('2018-06-05'),
          dob: new Date('2005-08-30'),
          parent_id: '660e8400-e29b-41d4-a716-446655440002'
        },

        // Parent 3's children (4)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440006',
          username: 'amit_patel',
          email: 'amit.patel@example.com',
          password_hash: '$2b$10$examplehash6',
          full_name: 'Amit Patel',
          adhar_number: '678901234567',
          school_id: 1,
          is_active: true,
          session: '2023-2024',
          grade: '11',
          gender: 'Male',
          admission_date: new Date('2019-06-10'),
          dob: new Date('2006-04-22'),
          parent_id: '660e8400-e29b-41d4-a716-446655440003'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440007',
          username: 'divya_patel',
          email: 'divya.patel@example.com',
          password_hash: '$2b$10$examplehash7',
          full_name: 'Divya Patel',
          adhar_number: '789012345678',
          school_id: 2,
          is_active: true,
          session: '2023-2024',
          grade: '9',
          gender: 'Female',
          admission_date: new Date('2021-06-22'),
          dob: new Date('2008-11-05'),
          parent_id: '660e8400-e29b-41d4-a716-446655440003'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440008',
          username: 'kavita_patel',
          email: 'kavita.patel@example.com',
          password_hash: '$2b$10$examplehash8',
          full_name: 'Kavita Patel',
          adhar_number: '890123456789',
          school_id: 3,
          is_active: true,
          session: '2023-2024',
          grade: '7',
          gender: 'Female',
          admission_date: new Date('2023-06-29'),
          dob: new Date('2010-07-18'),
          parent_id: '660e8400-e29b-41d4-a716-446655440003'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440009',
          username: 'rahul_patel',
          email: 'rahul.patel@example.com',
          password_hash: '$2b$10$examplehash9',
          full_name: 'Rahul Patel',
          adhar_number: '901234567890',
          school_id: 3,
          is_active: false,
          session: '2022-2023',
          grade: '8',
          gender: 'Male',
          admission_date: new Date('2022-06-27'),
          dob: new Date('2009-05-05'),
          parent_id: '660e8400-e29b-41d4-a716-446655440003'
        },

        // Parent 4's children (1)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440010',
          username: 'ananya_gupta',
          email: 'ananya.gupta@example.com',
          password_hash: '$2b$10$examplehash10',
          full_name: 'Ananya Gupta',
          adhar_number: '012345678901',
          school_id: 2,
          is_active: true,
          session: '2023-2024',
          grade: '10',
          gender: 'Female',
          admission_date: new Date('2020-06-18'),
          dob: new Date('2007-02-14'),
          parent_id: '660e8400-e29b-41d4-a716-446655440004'
        },

        // Parent 5's children (2)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440011',
          username: 'vikram_singh',
          email: 'vikram.singh@example.com',
          password_hash: '$2b$10$examplehash11',
          full_name: 'Vikram Singh',
          adhar_number: '112233445566',
          school_id: 3,
          is_active: true,
          session: '2023-2024',
          grade: '10',
          gender: 'Male',
          admission_date: new Date('2020-06-16'),
          dob: new Date('2007-04-19'),
          parent_id: '660e8400-e29b-41d4-a716-446655440005'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440012',
          username: 'isha_singh',
          email: 'isha.singh@example.com',
          password_hash: '$2b$10$examplehash12',
          full_name: 'Isha Singh',
          adhar_number: '223344556677',
          school_id: 3,
          is_active: true,
          session: '2023-2024',
          grade: '9',
          gender: 'Female',
          admission_date: new Date('2021-06-21'),
          dob: new Date('2008-10-31'),
          parent_id: '660e8400-e29b-41d4-a716-446655440005'
        },

        // Parent 6's children (1)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440013',
          username: 'tanvi_joshi',
          email: 'tanvi.joshi@example.com',
          password_hash: '$2b$10$examplehash13',
          full_name: 'Tanvi Joshi',
          adhar_number: '334455667788',
          school_id: 4,
          is_active: false,
          session: '2022-2023',
          grade: '12',
          gender: 'Female',
          admission_date: new Date('2018-06-08'),
          dob: new Date('2005-06-15'),
          parent_id: '660e8400-e29b-41d4-a716-446655440006'
        },

        // Parent 7's children (2)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440014',
          username: 'aditya_malhotra',
          email: 'aditya.malhotra@example.com',
          password_hash: '$2b$10$examplehash14',
          full_name: 'Aditya Malhotra',
          adhar_number: '445566778899',
          school_id: 4,
          is_active: false,
          session: '2022-2023',
          grade: '11',
          gender: 'Male',
          admission_date: new Date('2019-06-11'),
          dob: new Date('2006-01-20'),
          parent_id: '660e8400-e29b-41d4-a716-446655440007'
        },
        {
          student_id: '550e8400-e29b-41d4-a716-446655440015',
          username: 'pooja_malhotra',
          email: 'pooja.malhotra@example.com',
          password_hash: '$2b$10$examplehash15',
          full_name: 'Pooja Malhotra',
          adhar_number: '556677889900',
          school_id: 4,
          is_active: false,
          session: '2022-2023',
          grade: '10',
          gender: 'Female',
          admission_date: new Date('2020-06-17'),
          dob: new Date('2007-08-22'),
          parent_id: '660e8400-e29b-41d4-a716-446655440007'
        },

        // Parent 8's children (1)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440016',
          username: 'arjun_reddy',
          email: 'arjun.reddy@example.com',
          password_hash: '$2b$10$examplehash16',
          full_name: 'Arjun Reddy',
          adhar_number: '667788990011',
          school_id: 5,
          is_active: false,
          session: '2022-2023',
          grade: '9',
          gender: 'Male',
          admission_date: new Date('2021-06-23'),
          dob: new Date('2008-03-10'),
          parent_id: '660e8400-e29b-41d4-a716-446655440008'
        },

        // Parent 9's children (1)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440017',
          username: 'anjali_iyer',
          email: 'anjali.iyer@example.com',
          password_hash: '$2b$10$examplehash17',
          full_name: 'Anjali Iyer',
          adhar_number: '778899001122',
          school_id: 5,
          is_active: false,
          session: '2022-2023',
          grade: '8',
          gender: 'Female',
          admission_date: new Date('2022-06-27'),
          dob: new Date('2009-05-05'),
          parent_id: '660e8400-e29b-41d4-a716-446655440009'
        },

        // Parent 10's children (1)
        {
          student_id: '550e8400-e29b-41d4-a716-446655440018',
          username: 'varun_banerjee',
          email: 'varun.banerjee@example.com',
          password_hash: '$2b$10$examplehash18',
          full_name: 'Varun Banerjee',
          adhar_number: '889900112233',
          school_id: 5,
          is_active: false,
          session: '2022-2023',
          grade: '7',
          gender: 'Male',
          admission_date: new Date('2023-06-29'),
          dob: new Date('2010-07-18'),
          parent_id: '660e8400-e29b-41d4-a716-446655440010'
        }
      ]
    }),

    // Create health defects (same as before but with updated student IDs)
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
        // Student 4
        {
          student_id: '550e8400-e29b-41d4-a716-446655440004',
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
        // Student 5
        {
          student_id: '550e8400-e29b-41d4-a716-446655440005',
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
        // Student 6
        {
          student_id: '550e8400-e29b-41d4-a716-446655440006',
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
        // Student 7
        {
          student_id: '550e8400-e29b-41d4-a716-446655440007',
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
        // Student 8
        {
          student_id: '550e8400-e29b-41d4-a716-446655440008',
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
        // Student 10
        {
          student_id: '550e8400-e29b-41d4-a716-446655440010',
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
        // Student 11
        {
          student_id: '550e8400-e29b-41d4-a716-446655440011',
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
        // Student 12
        {
          student_id: '550e8400-e29b-41d4-a716-446655440012',
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
        // Student 13
        {
          student_id: '550e8400-e29b-41d4-a716-446655440013',
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
        // Student 14
        {
          student_id: '550e8400-e29b-41d4-a716-446655440014',
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
        // Student 15
        {
          student_id: '550e8400-e29b-41d4-a716-446655440015',
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
        // Student 16
        {
          student_id: '550e8400-e29b-41d4-a716-446655440016',
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
        // Student 17
        {
          student_id: '550e8400-e29b-41d4-a716-446655440017',
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

    // Create admin accounts
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
          role: 'HOD',
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