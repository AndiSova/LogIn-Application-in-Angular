import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  logInUser(userData: any) {
    return this.httpClient.post('http://localhost:3000/api/login', userData);
  }
}
