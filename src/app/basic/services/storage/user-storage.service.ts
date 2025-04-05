import { Injectable } from '@angular/core';


const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  static saveUser(body: any) {
    throw new Error('Method not implemented.');
  }
  static saveToken(token: any) {
    throw new Error('Method not implemented.');
  }
 
  // Save the token to localStorage
  public saveToken(token: string): void {
    if (this.isLocalStorage()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  // Get the token from localStorage
  static getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(TOKEN);
    }
    console.warn('localStorage is not available.');
    return null;
  }

  public saveUser(user: any): void {
    if (user && user.userId) {
      localStorage.setItem('s_user', JSON.stringify(user));
      localStorage.setItem('s_userId', String(user.userId));  // Store userId separately
      console.log("User ID saved:", user.userId); // Debugging
    } else {
      console.error("Invalid user object. User ID not found.");
    }
  }

  // Get the user object from localStorage
  static getUser(): any {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const user = localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    }
    console.warn('localStorage is not available.');
    return null;
  }

  static getUserId(): number {
    const userId = localStorage.getItem('s_userId');

    if (!userId || isNaN(Number(userId))) {
      console.warn("Invalid userId found in storage, returning default value 0.");
      return 0;
    }

    console.log("Retrieved userId:", Number(userId)); // Debugging
    return Number(userId);
  }



  // Get the user role
  static getUserRole(): string {
    const user = this.getUser();
    if (!user) {
      return '';
    }
    return user.role;
  }

  // Check if a client is logged in
  static isClientLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CLIENT';
  }

  // Check if a company is logged in
  static isCompanyLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'COMPANY';
  }

  // Sign out the user
  static signOut(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  // Check if localStorage is available
  private isLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}