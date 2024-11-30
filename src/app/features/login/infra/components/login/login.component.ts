import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { AplazoInputComponent } from '@apz/shared-ui/input';
import { LoginUseCase } from '../../../application/login.usecase';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent, AplazoInputComponent],
})
export class LoginComponent {
  readonly loginUseCase = inject(LoginUseCase);

  readonly username = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    ],
  });

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  login(): void {
    this.loginUseCase
      .execute({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe();

  }

  getErrorMessage(field: 'username' | 'password'): string {
    const control = this.form.get(field);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (field === 'username') {
      if (errors['required']) {
        return 'El correo electrónico es requerido';
      }
      if (errors['pattern']) {
        return 'Ingresa un correo electrónico válido';
      }
    }

    if (field === 'password') {
      if (errors['required']) {
        return 'La contraseña es requerida';
      }
      if (errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    return '';
  }
}
