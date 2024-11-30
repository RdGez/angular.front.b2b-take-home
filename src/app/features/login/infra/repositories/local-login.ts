import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Credentials } from '../../domain/entities/credentials';
import { LoginRepository } from '../../domain/repositories/login.repository';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LocalLogin implements LoginRepository {
  readonly #token = 'Cyph3Rt0k3n';
  readonly #toastr = inject(ToastrService);

  readonly testUser = {
    username: 'mysuper4dmin@aplazo.com',
    password: 'mySuperP4ssw0rd',
  }

  authenticate(credentials: Credentials): Observable<string | never> {
    if (credentials.username === this.testUser.username && credentials.password === this.testUser.password) {
      return of(this.#token);
    }

    this.#toastr.error('Usuario y/o contraseña incorrectos');
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
        })
    );
  }

  logOut(): Observable<void> {
    localStorage.removeItem('token');
    return of(undefined);
  }
}
