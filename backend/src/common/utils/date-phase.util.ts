export function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
//import { calculateAge } from 'src/utils/date-phase.util';
//response



// ----------------------------
// const student = await this.prisma.student.findUnique({
//   where: { student_id: id },
//   include: {
//     school: true,
//     defects: true,
//   },
// });

// return {
//   ...student,
//   age: student.dob ? calculateAge(student.dob) : null,
// };
