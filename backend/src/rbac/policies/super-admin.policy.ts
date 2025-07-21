import { AbilityBuilder } from '@casl/ability';
import { AppAbility, Actions, Subjects } from '../types';

export const defineSuperAdminPolicy = (can: AbilityBuilder<AppAbility>['can']) => {
  can('manage', 'all');
};
