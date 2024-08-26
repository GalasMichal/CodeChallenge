import { Company } from "./company.model";

export class User {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  companyId?: number;
  company?: Company;

  constructor(
    firstName: string = '',
    lastName: string = '',
    userName: string = '',
    password: string = '',
    confirmPassword: string = '',
    email?: string,
    companyId?: number,
    company?: Company
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
    this.companyId = companyId;
    this.company = company;
  }
}
