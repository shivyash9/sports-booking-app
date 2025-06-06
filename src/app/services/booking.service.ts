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

  // Fetch all events
  getUserEvents(userId: number): Observable<any[]> {
    const params = new HttpParams().set('user_id', userId.toString());

    return this.http.get<any[]>(`${this.baseUrl}/users/my_orders`, {
      params: params,
    });
  }

  // Fetch a specific event by ID
  getEventById(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${eventId}`);
  }

  // Book a slot (create an order)
  bookSlot(userId: number, eventId: number, seats: number): Observable<any> {
    const params = new HttpParams()
      .set('user_id', userId.toString())
      .set('event_id', eventId.toString())
      .set('seats', seats.toString());

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

  // Save token and password_digest to localStorage
  saveCredentials(
    token: string,
    userId: string,
    username: string = 'not_implemented'
  ) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', username);
    localStorage.setItem('user_id', userId);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Get password_digest from localStorage
  getPasswordDigest(): string | null {
    return localStorage.getItem('passwordDigest');
  }

  // Remove token and password_digest from localStorage
  removeCredentials() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('passwordDigest');
  }
}
