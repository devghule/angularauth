import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false; // For showing a loading spinner or message
  errorMessage: string = ''; // To display errors

  constructor(private authService: AuthService, private router: Router) {}

  // Handle login form submission
  async onLogin(): Promise<void> {
    this.errorMessage = ''; // Clear previous error message
    if (this.loginForm.valid) {
      this.loading = true;

      try {
        const { email, password } = this.loginForm.value;

        // Call AuthService login method
        const success = await this.authService.login(email!, password!);
        if (success) {
          console.log('Login Successful!');
          this.router.navigate(['/dashboard']); // Redirect to dashboard
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      } catch (error) {
        console.error('Login Failed:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
      } finally {
        this.loading = false; // Turn off loading state
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  // Navigate to the Register page
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
