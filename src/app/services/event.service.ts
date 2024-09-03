import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  // Create a new event
  createEvent(eventData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }
}
