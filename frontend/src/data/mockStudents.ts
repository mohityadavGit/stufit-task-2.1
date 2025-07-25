export type Student = {
  id: number;
  name: string;
  grade: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  school: string;
  session: string;
  admission_date?: string;
  date: string; // ISO format: YYYY-MM-DD
  defects: {
    eye?: { subType: 'myopia' | 'hypermetropia' | 'astigmatism' };
    dental?: { subType: 'gingivitis' | 'cavities' };
    fitness?: { subType: 'underweight' | 'obese' | 'inactive' };
    psychological?: { subType: 'anxiety' | 'adhd' | 'depression' };
    orthopedic?: { subType: 'flatfoot' | 'scoliosis' };
    hearing?: { subType: 'mild' | 'moderate' | 'severe' };
    ent?: { subType: 'sinusitis' | 'tonsillitis' };
  };
};


export const mockStudents: Student[] = [
  {
    id: 1,
    name: 'Arjun Mehta',
    grade: '5',
    age: 10,
    gender: 'Male',
    school: 'Green Valley School',
    session: '2024-25',
    date: '2025-05-10',
    defects: { eye: { subType: 'myopia' }, dental: { subType: 'cavities' } },
  },
  {
    id: 2,
    name: 'Sara Ali',
    grade: '6',
    age: 11,
    gender: 'Female',
    school: 'Springfield Public School',
    session: '2024-25',
    date: '2025-05-18',
    defects: { psychological: { subType: 'anxiety' } },
  },
  {
    id: 3,
    name: 'Kunal Shah',
    grade: '7',
    age: 12,
    gender: 'Male',
    school: 'Green Valley School',
    session: '2024-25',
    date: '2025-04-28',
    defects: { dental: { subType: 'gingivitis' } },
  },
  {
    id: 4,
    name: 'Ananya Roy',
    grade: '6',
    age: 11,
    gender: 'Female',
    school: 'Springfield Public School',
    session: '2023-24',
    date: '2025-03-20',
    defects: { eye: { subType: 'hypermetropia' }, fitness: { subType: 'inactive' } },
  },
  {
    id: 5,
    name: 'Ravi',
    grade: '5',
    age: 10,
    gender: 'Male',
    school: 'City International',
    session: '2023-24',
    date: '2025-02-10',
    defects: { orthopedic: { subType: 'flatfoot' } },
  },
  {
    id: 6,
    name: 'Neha Sharma',
    grade: '7',
    age: 13,
    gender: 'Female',
    school: 'City International',
    session: '2024-25',
    date: '2025-05-03',
    defects: { hearing: { subType: 'mild' } },
  },
  {
    id: 7,
    name: 'Vikas Rana',
    grade: '8',
    age: 13,
    gender: 'Male',
    school: 'Hilltop Academy',
    session: '2023-24',
    date: '2025-01-15',
    defects: { psychological: { subType: 'adhd' }, eye: { subType: 'myopia' } },
  },
  {
    id: 8,
    name: 'Riya Kapoor',
    grade: '6',
    age: 11,
    gender: 'Female',
    school: 'Hilltop Academy',
    session: '2023-24',
    date: '2025-03-30',
    defects: { dental: { subType: 'gingivitis' } },
  },
  {
    id: 9,
    name: 'Kabir Singh',
    grade: '8',
    age: 13,
    gender: 'Male',
    school: 'Green Valley School',
    session: '2024-25',
    date: '2025-04-12',
    defects: { ent: { subType: 'tonsillitis' } },
  },
  {
    id: 10,
    name: 'Meera Joshi',
    grade: '5',
    age: 10,
    gender: 'Female',
    school: 'Springfield Public School',
    session: '2023-24',
    date: '2025-01-22',
    defects: { orthopedic: { subType: 'scoliosis' }, fitness: { subType: 'underweight' } },
  },
  {
    id: 11,
    name: 'Dev Patel',
    grade: '7',
    age: 12,
    gender: 'Male',
    school: 'City International',
    session: '2024-25',
    date: '2025-05-02',
    defects: { hearing: { subType: 'moderate' }, ent: { subType: 'sinusitis' } },
  },
  {
    id: 12,
    name: 'Aanya Verma',
    grade: '6',
    age: 11,
    gender: 'Female',
    school: 'Green Valley School',
    session: '2023-24',
    date: '2025-02-18',
    defects: { fitness: { subType: 'obese' } },
  },
  {
    id: 13,
    name: 'Rohan Das',
    grade: '8',
    age: 14,
    gender: 'Male',
    school: 'Springfield Public School',
    session: '2023-24',
    date: '2025-03-05',
    defects: { psychological: { subType: 'depression' } },
  },
  {
    id: 14,
    name: 'Tanya Bhatt',
    grade: '5',
    age: 10,
    gender: 'Female',
    school: 'Hilltop Academy',
    session: '2024-25',
    date: '2025-04-14',
    defects: { eye: { subType: 'astigmatism' }, dental: { subType: 'cavities' } },
  },
  {
    id: 15,
    name: 'Aryan Jain',
    grade: '7',
    age: 12,
    gender: 'Male',
    school: 'City International',
    session: '2023-24',
    date: '2025-02-06',
    defects: { orthopedic: { subType: 'flatfoot' }, hearing: { subType: 'severe' } },
  },
  {
    id: 16,
    name: 'Simran Kaur',
    grade: '6',
    age: 11,
    gender: 'Female',
    school: 'Green Valley School',
    session: '2023-24',
    date: '2025-01-30',
    defects: { dental: { subType: 'cavities' }, ent: { subType: 'tonsillitis' } },
  },
  {
    id: 17,
    name: 'Aarav Nair',
    grade: '5',
    age: 10,
    gender: 'Male',
    school: 'Hilltop Academy',
    session: '2024-25',
    date: '2025-05-15',
    defects: { eye: { subType: 'myopia' }, fitness: { subType: 'inactive' } },
  },
  {
    id: 18,
    name: 'Ishita Ghosh',
    grade: '7',
    age: 13,
    gender: 'Female',
    school: 'Springfield Public School',
    session: '2024-25',
    date: '2025-04-08',
    defects: { hearing: { subType: 'mild' }, psychological: { subType: 'anxiety' } },
  },
  {
    id: 19,
    name: 'Nikhil Agarwal',
    grade: '8',
    age: 14,
    gender: 'Male',
    school: 'City International',
    session: '2023-24',
    date: '2025-03-25',
    defects: { eye: { subType: 'hypermetropia' } },
  },
  {
    id: 20,
    name: 'Priya Sen',
    grade: '6',
    age: 11,
    gender: 'Female',
    school: 'Hilltop Academy',
    session: '2023-24',
    date: '2025-02-12',
    defects: { psychological: { subType: 'adhd' }, dental: { subType: 'gingivitis' } },
  },
];
