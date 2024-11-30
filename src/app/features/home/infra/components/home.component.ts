import { Component, inject, OnInit } from '@angular/core';
import { OperationsResume } from '../../../../core/models/operation.model';
import { OperationUseCase } from '../../application/home.usecase';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [DecimalPipe]
})
export class HomeComponent implements OnInit {
  readonly operationsUseCase = inject(OperationUseCase);

  operationsResume: OperationsResume = {
    total: 0,
    average: 0,
    totalOperations: 0,
  }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(): void {
    this.operationsUseCase.getOperationsResume().subscribe((operationsResume) => {
      this.operationsResume = operationsResume;
    })
  }
}
