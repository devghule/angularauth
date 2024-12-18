import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    this.errorMessage = '';
    if (this.registerForm.valid) {
      this.loading = true;

      // Log the form values for debugging
      console.log('Form Values:', this.registerForm.value);

      const { name, email, password } = this.registerForm.value;

      this.authService
        .register(name, email, password)
        .then((success) => {
          if (success) {
            console.log('Registration Successful!');
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Registration failed, please try again.';
          }
        })
        .catch((error) => {
          console.error('Registration Failed:', error);
          this.errorMessage = 'Error occurred during registration.';
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
