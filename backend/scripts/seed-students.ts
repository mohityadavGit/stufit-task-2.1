import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'


const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding process...')

  const schoolIds = [0, 1, 2, 3]

  for (const school_id of schoolIds) {
    console.log(`🏫 Seeding students for school_id = ${school_id}`)

    for (let i = 1; i <= 3; i++) {
      const student_id = uuidv4()
      
      // Hash the password '123456' for each student
      const hashedPassword = await bcrypt.hash('123456', 10)

      const student = await prisma.student.create({
        data: {
          student_id,
          username: `student${school_id}_${i}`,
          email: `student${school_id}_${i}@school.com`,
          password_hash: hashedPassword,  // hashed password here
          full_name: `Student ${school_id}-${i}`,
          adhar_number: `1234567890${school_id}${i}`,
          school_id
        }
      })

      console.log(`👦 Created student: ${student.full_name}`)

      await prisma.studentHealthDefect.createMany({
        data: [
          {
            student_id: student.student_id,
            defect_type: 'Vision',
            affected_body_part: 'Eyes',
            defect_details: {
              description: 'Short-sightedness',
              recommended_aid: 'Glasses'
            },
            severity: 'Mild'
          },
          {
            student_id: student.student_id,
            defect_type: 'Posture',
            affected_body_part: 'Back',
            defect_details: {
              description: 'Scoliosis',
              therapy: 'Physiotherapy'
            },
            severity: 'Moderate'
          }
        ]
      })

      console.log(`🩺 Added health defects for ${student.username}`)
    }
  }

  console.log('✅ Seeding completed successfully!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
