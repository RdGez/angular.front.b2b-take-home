import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Operation } from '../../../../core/models/operation.model';
import { HttpClient } from '@angular/common/http';
import { OperationsRepository } from '../../domain/repositories/operations.repository';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LocalOperations implements OperationsRepository {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'assets/db.json';
  readonly #alert = inject(ToastrService);

  getOperations(startDate?: string, endDate?: string): Observable<Operation[]> {
    return this.#http.get<Operation[]>(this.#apiUrl).pipe(
      map((operations) => {
        let auxOperations = operations;

        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);

          operations = operations.filter((operation) => {
            const operationDate = new Date(operation.date.split(' ')[0]);
            return operationDate >= start && operationDate <= end;
          });
        }

        if (operations.length > 0) return operations;

        this.#alert.info(`No se encontraron operaciones en este rango de fechas, intente con otro rango`);
        return auxOperations;
      })
    );
  }
}
