import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch all events
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/events/index`);
  }

  // Fetch a specific event by ID
  getEventById(eventId: number): Observable<any> {
    console.log('Hiiiii');
    return this.http.get<any>(`${this.baseUrl}/events/${eventId}`);
  }

  // Book a slot (create an order)
  bookSlot(userId: number, eventId: number): Observable<any> {
    const params = new HttpParams()
      .set('user_id', userId.toString())
      .set('event_id', eventId.toString());

    return this.http.post<any>(`${this.baseUrl}/orders`, null, { params });
  }

  // Sign up a new user
  signUp(email: string, username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.baseUrl}/signup`, null, { params });
  }

  // Log in a user
  logIn(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<any>(`${this.baseUrl}/login`, null, { params });
  }
}
