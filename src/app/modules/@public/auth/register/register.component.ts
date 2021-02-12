import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
    email: [ '', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ] ],
    password: [ null, Validators.required ],
    re_password: [ null, Validators.required ],
    terms: [ true, Validators.required ]
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  createUser(): void {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        console.warn(err.error.message);
        Swal.fire('Error', err.error.message, 'error');
        this.formSubmitted = false;
      });
  }

  fieldNotValid(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted;
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordsValidate(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('re_password').value;
    return pass1 !== pass2 && this.formSubmitted;
  }
}
