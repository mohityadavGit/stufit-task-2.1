// src/rbac/types.ts
import type { Student, StudentHealthDefect, School } from '@prisma/client';
import { PureAbility } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type Subjects =
  | Student
  | StudentHealthDefect
  | School
  | 'Student'
  | 'StudentHealthDefect'
  | 'School'
  | 'Parent'      
  | 'all';

export type AppAbility = PureAbility<[Actions, Subjects]>;

export type AppUser = {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'HOD' | 'STUDENT';
  id?: string;
  school_id?: number;
};
