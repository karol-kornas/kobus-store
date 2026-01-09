export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  needsPasswordReset: boolean;
};

export type AuthErrorResponse = {
  code: string;
  message?: string;
};
