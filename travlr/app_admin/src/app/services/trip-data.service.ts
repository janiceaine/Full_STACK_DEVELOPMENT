import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'reflect-metadata';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage ) {}

  getTrips(): Observable<Trip[]> {
    console.log(`API call made to: ${this.apiUrl}`);
    return this.http.get<Trip[]>(this.apiUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, formData);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${formData.code}`, formData);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(handleError);
  }
}

function handleError(error: any): Promise<any> {
  console.error('Something has gone wrong', error);
  return Promise.reject(error.error.message || error);
}

// function Inject(storage: any) {
//   return function(target: any, _: string | undefined, parameterIndex: number): void {
//     Reflect.defineMetadata('design:paramtypes', [storage], target, `param:${parameterIndex}`);
//   };
// }

// function Inject_(BROWSER_STORAGE: any): (target: typeof TripDataService, propertyKey: undefined, parameterIndex: 1) => void {
//   throw new Error('Function not implemented.');
// }

