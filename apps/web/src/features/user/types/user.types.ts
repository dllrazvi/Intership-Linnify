import { UserRole } from '@app/user/types/enums/user-role.enum.ts';

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
};
