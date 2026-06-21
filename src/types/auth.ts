export type UserRole = 'superadmin' | 'admin' | 'user' | null;

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface AuthUser {
  uid: string;
  email: string | null;
  role: UserRole;
  displayName: string | null;
  photoURL?: string | null;
  status: UserStatus;
  permissions: Permission[];
}

export type Permission =
  | 'manage_users'
  | 'manage_admins'
  | 'manage_shops'
  | 'manage_content'
  | 'view_analytics'
  | 'view_logs'
  | 'manage_settings'
  | 'send_notifications';

export const ROLE_PERMISSIONS: Record<NonNullable<UserRole>, Permission[]> = {
  superadmin: [
    'manage_users',
    'manage_admins',
    'manage_shops',
    'manage_content',
    'view_analytics',
    'view_logs',
    'manage_settings',
    'send_notifications'
  ],
  admin: [
    'manage_users',
    'manage_shops',
    'manage_content',
    'view_analytics',
    'send_notifications'
  ],
  user: [
    'view_analytics'
  ]
};
