// import { Injectable } from '@nestjs/common';
// import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from '@casl/ability';
// import { AdminLogin,Student, StudentHealthDefect} from '@prisma/client';

// export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// type Subjects = InferSubjects<typeof Student | typeof StudentHealthDefect> | 'all';

// export type AppAbility = PureAbility<[Actions, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//   createForUser(user: { role: string; school_id?: number }): AppAbility {
//     const { can, cannot, build } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
//       PureAbility as AbilityClass<AppAbility>,
//     );

//     if (user.role === 'ADMIN') {
//       can('manage', 'all'); // Full access
//     } else if (user.role === 'HOD') {
//       can('read', Student, { school_id: user.school_id });
//       can('read', StudentHealthDefect);
//     } else if (user.role === 'STUDENT') {
//       can('read', Student, { student_id: user.id });
//       can('read', StudentHealthDefect, { student_id: user.id });
//     }

//     return build({
//       detectSubjectType: (item) =>
//         typeof item === 'string' ? item : (item as any).constructor,
//     });
//   }
// }
