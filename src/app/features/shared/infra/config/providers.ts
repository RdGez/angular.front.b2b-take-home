import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { OperationUseCase } from '../../../home/application/home.usecase';
import { OperationsRepository } from '../../domain/repositories/operations.repository';
import { LocalOperations } from '../repositories/local-operations';

export function provideOperations(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(),
    {
      provide: OperationsRepository,
      useClass: LocalOperations,
    },
    OperationUseCase
  ]);
}
