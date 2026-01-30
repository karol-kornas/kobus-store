export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  needsPasswordReset: boolean;
  billingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
    postcode: string;
    street: string;
  };
};

export type AuthErrorResponse = {
  code: string;
  message?: string;
};
