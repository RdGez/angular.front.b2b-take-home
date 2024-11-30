import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../../../core/models/operation.model';
import { OperationsRepository } from '../../shared/domain/repositories/operations.repository';

@Injectable({
  providedIn: 'root',
})
export class OperationUseCase {
  readonly #repository = inject(OperationsRepository);

  getOperations(): Observable<Operation[]> {
    try {
      return this.#repository.getOperations();
    } catch(error) {
      console.warn(error);
      throw error;
    }
  }
}
