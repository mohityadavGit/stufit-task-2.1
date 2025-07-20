import { Student } from './types';

export const parentData: Student[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    grade: '5',
    age: 10,
    gender: 'M',
    school: 'Green Valley School',
    fathers_name: 'Parent1',
    session: '2024-25',
    date: '2025-07-01',
    defects: {
      eye: { subType: 'myopia' },
      dental: { subType: 'cavity' },
    },
  },
  {
    id: 2,
    name: 'Isha Sharma',
    grade: '7',
    age: 12,
    gender: 'F',
    school: 'Green Valley School',
    fathers_name: 'Parent1',
    session: '2024-25',
    date: '2025-07-01',
    defects: {
      fitness: { subType: 'obesity' },
      psychological: { subType: 'anxiety' },
    },
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    grade: '6',
    age: 11,
    gender: 'M',
    school: 'Sunshine Public School',
    fathers_name: 'Parent2',
    session: '2024-25',
    date: '2025-07-01',
    defects: {
      ent: { subType: 'sinusitis' },
      hearing: { subType: 'partial hearing loss' },
    },
  },
];
