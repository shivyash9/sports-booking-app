import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}

  // Get the list of all locations
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Create a new location
  createLocation(locationData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, locationData);
  }
}
