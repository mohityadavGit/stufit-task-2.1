import { AbilityBuilder } from '@casl/ability';
import { AppAbility, AppUser } from '../types';

export const defineStudentPolicy = (
  can: AbilityBuilder<AppAbility>['can'],
  user: AppUser
) => {
  can('read', 'Student', { student_id: user.id });
  can('read', 'StudentHealthDefect', { student_id: user.id });
};
