import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  PureAbility,
} from '@casl/ability';

import { AppAbility, AppUser } from './types';
import { defineSuperAdminPolicy } from './policies/super-admin.policy';
import { defineAdminPolicy } from './policies/admin.policy';
import { defineHodPolicy } from './policies/hod.policy';
import { defineStudentPolicy } from './policies/student.policy';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: AppUser): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>
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
    }

    return build({
      detectSubjectType: (item) =>
        typeof item === 'string' ? item : (item as any).constructor.name,
    });
  }
}
