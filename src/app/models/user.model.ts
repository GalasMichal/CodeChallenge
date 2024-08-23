export class User {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  companyId?: number;

  constructor(companyId?: number) {
    this.companyId = companyId; 
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
  }
}
