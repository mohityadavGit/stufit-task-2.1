export type Student = {
  id: number;
  name: string;
  grade: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  school: string;
  session: string;
  date: string; // screening date (you might rename it for clarity)
  admission_date: string; // ✅ Add this line (ISO date string)
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

// Extended Student type for parent data with family relationships
export type StudentWithParent = Student & {
  fathers_name: string;
  mothers_name?: string;
  parent_contact?: string;
  parent_email?: string;
};
