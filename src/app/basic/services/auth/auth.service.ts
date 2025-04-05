import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';  // Remove trailing slash

export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  constructor(private http: HttpClient,
    private userstorageservice: UserStorageService,
  ) {}

 // Register a client
  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}client/sign-up`, signupRequestDTO);
  }

  // Register a company
  registerCompany(signupRequestDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}company/sign-up`, signupRequestDTO);
  }
  
  // User login
  login(userName: string, password: string): Observable<any> {
    return this.http
      .post(`${BASIC_URL}authenticate`, { username: userName, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log('Login API response:', res.body); // Debugging
  
          if (res.body) {
            this.userstorageservice.saveUser(res.body);  // Save user
            this.userstorageservice.saveToken(res.body.token);  // Save token
          }
  
          if (res.body?.token) {
            return res;
          } else {
            console.error('Token missing in response.');
            throw new Error('Token not found in response.');
          }
        })
      );
  }
  
}