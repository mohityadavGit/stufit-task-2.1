// Mock data for testing the frontend when backend is not available

export const mockSummaryData = {
  total_students: 120,
  vision: 25,
  hearing: 15,
  dental: 30,
  physical_fitness: 20,
  nutritional: 18,
  respiratory: 12,
  skin: 8,
  posture: 10,
};

export const mockDetailedData = {
  totalStudents: 120,
  vision: {
    "myopia": 15,
    "hyperopia": 8,
    "astigmatism": 2,
  },
  hearing: {
    "hearing_loss_mild": 8,
    "hearing_loss_moderate": 5,
    "tinnitus": 2,
  },
  dental: {
    "cavities": 18,
    "gum_disease": 8,
    "tooth_misalignment": 4,
  },
  physical_fitness: {
    "low_endurance": 12,
    "muscle_weakness": 5,
    "flexibility_issues": 3,
  },
  nutritional: {
    "underweight": 10,
    "overweight": 6,
    "malnutrition": 2,
  },
  respiratory: {
    "asthma": 8,
    "allergies": 3,
    "breathing_issues": 1,
  },
  skin: {
    "eczema": 4,
    "acne": 3,
    "allergic_reactions": 1,
  },
  posture: {
    "scoliosis": 6,
    "kyphosis": 3,
    "forward_head_posture": 1,
  },
};
