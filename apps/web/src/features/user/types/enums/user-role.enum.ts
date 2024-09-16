export enum UserRole {
  ADMIN = 'admin',
  LINNIFIAN = 'linnifian'
}

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.LINNIFIAN]: 'Linnifian'
};
