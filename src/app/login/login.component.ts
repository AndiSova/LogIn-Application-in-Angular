import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logInForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private logInService: LoginService,
    private router: Router
  ) {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.logInForm.valid) {
      this.logInService.logInUser(this.logInForm.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/mainscreen']);
          },
          error: (error) => {
            this.errorMessage = 'An error occurred during registration';
          }
        });
    } else {
      this.errorMessage = 'Please complete all fields';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
