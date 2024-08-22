export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  companyId?: number;
}
