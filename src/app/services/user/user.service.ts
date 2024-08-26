import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5248/api/User';

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${username}`);
  }

  getUserById(Id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${Id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  updateUser(User: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${User.id}`, User);
  }

  deleteUser(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }
}
