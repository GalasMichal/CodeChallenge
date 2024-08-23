import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:5248/api/company';

  constructor() { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  checkCompanyExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${name}`);
  }

  getCompanyById(Id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${Id}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  updateCompany(company: Company): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${company.companyId}`, company);
  }

  deleteCompany(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }
}
