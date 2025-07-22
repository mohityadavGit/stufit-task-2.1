import { Student } from '@/data/students';

// Utility function to convert Student[] to summary data format
export function transformStudentsToSummary(students: Student[]) {
  const summary = {
    total_students: students.length,
    vision: 0,
    hearing: 0,
    dental: 0,
    physical_fitness: 0,
    nutritional: 0,
    respiratory: 0,
    skin: 0,
    posture: 0,
  };

  students.forEach((student) => {
    const defects = student.defects || {};
    
    // Map frontend defect names to backend names
    if (defects.eye) summary.vision++;
    if (defects.hearing) summary.hearing++;
    if (defects.dental) summary.dental++;
    if (defects.fitness) summary.physical_fitness++;
    if (defects.psychological) summary.nutritional++;
    if (defects.ent) summary.respiratory++;
    if (defects.orthopedic) summary.skin++; // Adjust mapping as needed
    // Note: You might need to adjust these mappings based on your actual data structure
  });

  return summary;
}

// Utility function to get detailed data for a specific defect type from Student[]
export function getDefectSubtypes(students: Student[], defectType: string) {
  const subtypeCounts: Record<string, number> = {};

  students.forEach((student) => {
    const defects = student.defects || {};
    let defect = null;

    // Map defect types
    switch (defectType) {
      case 'eye':
      case 'vision':
        defect = defects.eye;
        break;
      case 'hearing':
        defect = defects.hearing;
        break;
      case 'dental':
        defect = defects.dental;
        break;
      case 'fitness':
      case 'physical_fitness':
        defect = defects.fitness;
        break;
      case 'psychological':
      case 'nutritional':
        defect = defects.psychological;
        break;
      case 'ent':
      case 'respiratory':
        defect = defects.ent;
        break;
      case 'orthopedic':
      case 'skin':
      case 'posture':
        defect = defects.orthopedic;
        break;
    }

    if (defect?.subType) {
      const subtype = defect.subType.trim().toLowerCase();
      subtypeCounts[subtype] = (subtypeCounts[subtype] || 0) + 1;
    }
  });

  return subtypeCounts;
}
