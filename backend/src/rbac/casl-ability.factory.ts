// casl-ability.factory.ts

import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';

// Sirf types import kiye hain, runtime object nahi (TypeScript optimization)
import type { Student, StudentHealthDefect, School } from '@prisma/client';

// Step 1: Actions define kar rahe hain jo kisi model pe allowed hote hain
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// Step 2: Models ya tables jinke upar access rules lagne hain
type Subjects =
  | InferSubjects<Student | StudentHealthDefect | School>
  | 'Student'
  | 'StudentHealthDefect'
  | 'School'
  | 'Parent'
  | 'all';

// Step 3: AppAbility type banayi ja rahi hai - har permission ek pair hota hai [action, subject]
export type AppAbility = PureAbility<[Actions, Subjects]>;

// Step 4: CaslAbilityFactory class har user ke role ke hisaab se rules banati hai
@Injectable()
export class CaslAbilityFactory {
  createForUser(user: {
    role: 'SUPER_ADMIN' | 'ADMIN' | 'HOD' | 'PARENT' | 'STUDENT'; // Role identify karega access
    id?: string;             // Student ka ID (agar student hai)
    school_id?: number;      // School ID (agar HOD ya Admin hai)
  }): AppAbility {
    // AbilityBuilder se can, cannot, build functions milte hain
    const { can, cannot, build } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>
    );

    // SUPER_ADMIN: poore system pe full access
    if (user.role === 'SUPER_ADMIN') {
      can('manage', 'all'); // manage = sab kuch kar sakta hai
    }

    // ADMIN: apne school ke students aur defects pe full control
    else if (user.role === 'ADMIN') {
      can('manage', 'Student', { school_id: user.school_id });
      can('manage', 'StudentHealthDefect', {
        student: { school_id: user.school_id }, // nested relation
      });
      can('read', 'School', { school_id: user.school_id });
    }

    // HOD: apne school ke students aur defects sirf padh sakta hai
    else if (user.role === 'HOD') {
      can('read', 'Student', { school_id: user.school_id });
      can('read', 'StudentHealthDefect', {
        student: { school_id: user.school_id },
      });
      can('read', 'School', { school_id: user.school_id });
    }

    // STUDENT: apna hi data aur apne health defects padh sakta hai
    else if (user.role === 'STUDENT') {
      can('read', 'Student', { student_id: user.id });
      can('read', 'StudentHealthDefect', { student_id: user.id });
    }

    // Final ability object return kar rahe hain
    return build({
      detectSubjectType: (item) =>
        typeof item === 'string' ? item : (item as any).constructor.name,
    });
  }
}
