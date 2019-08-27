import { UserResponse } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { longStackSupport } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  user: User;
  authUrl = environment.authUrl;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    this.http.post<UserResponse>(`${this.authUrl}login/`, {username, password}).subscribe(data => {
      this.user = data.user;
      localStorage.setItem('token', data.token);
    });
  }

  logout() {
    this.http.post(`${this.authUrl}logout/`, {}).subscribe(data => {
      console.log(data);
      localStorage.removeItem('token');
    });
  }
}
