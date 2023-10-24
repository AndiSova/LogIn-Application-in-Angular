import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  registerUser(userData: any) {
    return this.httpClient.post('http://localhost:3000/api/register', userData);
  }
}
