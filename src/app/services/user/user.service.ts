import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5248/api/user';



  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(Id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${Id}`);
  }

  addUser(User: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, User);
  }

  updateUser(User: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${User.id}`, User);
  }

  deleteUser(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }
}
