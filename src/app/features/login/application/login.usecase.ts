import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { Credentials } from '../domain/entities/credentials';
import { LoginRepository } from '../domain/repositories/login.repository';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  readonly #router = inject(Router);
  readonly #repository = inject(LoginRepository);
  readonly #toastr = inject(ToastrService);

  execute(credentials: Credentials): Observable<string> {
    try {
      if (!credentials.username) {
        this.#toastr.error('El correo electrónico es requerido');
        throw new Error('El correo electrónico es requerido');
      }

      return this.#repository.authenticate(credentials).pipe(
        tap((token) => {
          localStorage.setItem('token', token);
          this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
        }),

        take(1)
      );
    } catch (error) {
      console.warn(error);

      throw error;
    }
  }
}
