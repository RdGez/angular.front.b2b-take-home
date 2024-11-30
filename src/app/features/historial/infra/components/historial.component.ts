import { Component, inject, OnInit } from '@angular/core';
import { OperationsRepository } from '../../../shared/domain/repositories/operations.repository';
import { Operation } from '../../../../core/models/operation.model';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  imports: [DecimalPipe, DatePipe],
})
export class HistorialComponent implements OnInit {
  readonly #repository = inject(OperationsRepository);

  currentPage = 1;
  pageSize = 20;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];
  operations: Operation[] = [];

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  ngOnInit(): void {
    this.getOperations();
  }

  getOperations(): void {
    this.#repository.getOperations().subscribe((operations) => {
      this.operations = operations;
      this.totalItems = operations.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updatePageNumbers();

      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.operations = operations.slice(start, end);
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getOperations();
  }

  private updatePageNumbers() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
