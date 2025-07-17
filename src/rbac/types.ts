import { Ability } from '@casl/ability';

export type Subjects = 'Student' | 'MedicalRecord' | 'OwnMedicalRecord' | 'all';
export type AppAbility = Ability<[string, Subjects]>;
