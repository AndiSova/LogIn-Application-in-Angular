import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationService.registerUser(this.registrationForm.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            if (error.status === 400) {
              this.errorMessage = 'Email is already in use';
            } else {
              this.errorMessage = 'An error occurred during registration';
            }
          }
        });
    } else {
      this.errorMessage = 'Please complete all fields';
    }
  }

  goToLogIn() {
    this.router.navigate(['/login']);
  }
}