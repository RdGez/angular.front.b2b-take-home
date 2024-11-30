import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../../../../core/models/operation.model';
import { HttpClient } from '@angular/common/http';
import { OperationsRepository } from '../../domain/repositories/operations.repository';

@Injectable({
  providedIn: 'root',
})
export class LocalOperations implements OperationsRepository {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'assets/db.json';

  getOperations(): Observable<Operation[]> {
    return this.#http.get<Operation[]>(this.#apiUrl);
  }
}
