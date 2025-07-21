import { AbilityBuilder } from '@casl/ability';
import { AppAbility, AppUser } from '../types';

export const defineHodPolicy = (
  can: AbilityBuilder<AppAbility>['can'],
  user: AppUser
) => {
  can('read', 'Student', { school_id: user.school_id });
  can('read', 'StudentHealthDefect', { student: { school_id: user.school_id } });
  can('read', 'School', { school_id: user.school_id });
};
