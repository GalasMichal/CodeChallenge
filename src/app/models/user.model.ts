export interface User {
  Id?: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  ConfirmPassword: string;
  Email?: string;
  CompanyId: number;
}
