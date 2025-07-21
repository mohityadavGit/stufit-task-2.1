import { AbilityBuilder } from '@casl/ability';
import { AppAbility, Actions, Subjects, AppUser } from '../types';

export const defineAdminPolicy = (
  can: AbilityBuilder<AppAbility>['can'],
  user: AppUser
) => {
  can('manage', 'Student', { school_id: user.school_id });
  can('manage', 'StudentHealthDefect', { student: { school_id: user.school_id } });
  can('read', 'School', { school_id: user.school_id });
};
