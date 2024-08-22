import { Injectable } from '@angular/core';
import { Sector } from '../../models/sector.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorService{
  private apiUrl = 'http://localhost:5248/api/sector';

  constructor(private http: HttpClient) { }


  getSectors(): any {
    return this.http.get<any>(this.apiUrl);
  }


  getSectorById(id: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.apiUrl}/${id}`);
  }
}
