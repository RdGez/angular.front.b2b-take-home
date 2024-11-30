import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Operation, OperationsResume } from '../../../core/models/operation.model';
import { OperationsRepository } from '../../shared/domain/repositories/operations.repository';

@Injectable({
  providedIn: 'root',
})
export class OperationUseCase {
  readonly #repository = inject(OperationsRepository);

  getOperationsResume(): Observable<OperationsResume> {
    try {
      return this.#repository.getOperations().pipe(
        map((operations: Operation[]) => {
          const total = operations.reduce((acc, operation) => acc + operation.price, 0);
          const totalOperations = operations.length;
          const average = total / totalOperations;

          return {
            total,
            totalOperations,
            average,
          }
        }),
        take(1)
      );
    } catch(error) {
      console.warn(error);
      throw error;
    }
  }
}
