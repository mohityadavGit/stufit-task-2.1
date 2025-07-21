import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  PureAbility,
  InferSubjects,
} from '@casl/ability';

import type { Student, StudentHealthDefect, School } from '@prisma/client';

import { AppAbility, AppUser } from './types';
import { defineSuperAdminPolicy } from './policies/super-admin.policy';
import { defineAdminPolicy } from './policies/admin.policy';
import { defineHodPolicy } from './policies/hod.policy';
import { defineStudentPolicy } from './policies/student.policy';

// Define the types of actions allowed
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// Define the subjects (models/resources) on which actions can be performed
type Subjects =
  | InferSubjects<Student | StudentHealthDefect | School>
  | 'Student'
  | 'StudentHealthDefect'
  | 'School'
  | 'Parent'
  | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: AppUser): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
      PureAbility as AbilityClass<PureAbility<[Actions, Subjects]>>
    );

    switch (user.role) {
      case 'SUPER_ADMIN':
        defineSuperAdminPolicy(can);
        break;
      case 'ADMIN':
        defineAdminPolicy(can, user);
        break;
      case 'HOD':
        defineHodPolicy(can, user);
        break;
      case 'STUDENT':
        defineStudentPolicy(can, user);
        break;
      // Add more cases if needed
    }

    return build({
      detectSubjectType: (item) =>
        typeof item === 'string' ? item : (item as any).constructor.name,
    });
  }
}
