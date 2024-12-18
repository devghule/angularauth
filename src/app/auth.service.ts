import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken'; // Key to store the token in localStorage
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend API URL

  constructor(private router: Router) {}

  /**
   * Login method: Sends credentials to backend API using fetch and stores the token.
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem(this.tokenKey, data.token); // Store token in localStorage
        console.log('Login successful, token saved.');
        return true; // Success
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
      } else {
        console.error('An unexpected error occurred during login.');
      }
      return false; // Login failed
    }
  }

  /**
   * Register method: Sends registration data to backend API.
   */
  async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      if (data && data.success) {
        console.log('Registration successful');
        return true; // Success
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Registration error:', error.message);
      } else {
        console.error('An unexpected error occurred during registration.');
      }
      return false; // Registration failed
    }
  }

  /**
   * Check if user is logged in by verifying the presence of a token.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Logout method: Clears the stored token and redirects to the login page.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
    console.log('User logged out successfully.');
  }

  /**
   * Get the stored token (e.g., for sending in HTTP headers).
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
