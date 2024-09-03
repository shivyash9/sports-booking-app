import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  private apiUrl = 'http://localhost:3000/sports';

  constructor(private http: HttpClient) {}

  // Get the list of all sports
  getSports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Create a new sport
  createSport(sportData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, sportData);
  }
}
