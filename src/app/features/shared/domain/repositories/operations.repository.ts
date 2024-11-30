import { Observable } from "rxjs";
import { Operation } from "../../../../core/models/operation.model";

export abstract class OperationsRepository {
  abstract getOperations(): Observable<Operation[]>;
}
