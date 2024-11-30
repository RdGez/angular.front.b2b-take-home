import { Component, inject, OnInit } from '@angular/core';
import { OperationsRepository } from '../../../shared/domain/repositories/operations.repository';
import { Operation } from '../../../../core/models/operation.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AplazoInputComponent } from '@apz/shared-ui/input';
import { AplazoButtonComponent } from '@apz/shared-ui/button';

@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  imports: [
    DecimalPipe,
    DatePipe,
    ReactiveFormsModule,
    AplazoInputComponent,
    AplazoButtonComponent,
  ],
})
export class HistorialComponent implements OnInit {
  readonly #repository = inject(OperationsRepository);

  readonly form = new FormGroup({
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(new Date().toISOString().split('T')[0]),
  });

  currentPage = 1;
  pageSize = 20;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];

  operations: Operation[] = [];
  private currentStartDate: string | null = null;
  private currentEndDate: string | null = null;

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
    const operations$ =
      this.currentStartDate && this.currentEndDate
        ? this.#repository.getOperations(
            this.currentStartDate,
            this.currentEndDate
          )
        : this.#repository.getOperations();

    operations$.subscribe((operations) => {
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

  search() {
    const startDate = this.form.get('startDate')?.value ?? null;
    const endDate = this.form.get('endDate')?.value ?? null;

    if (startDate && endDate) {
      this.currentStartDate = startDate;
      this.currentEndDate = endDate;
      this.currentPage = 1;
      this.getOperations();
    }
  }

  reset() {
    this.form.get('startDate')?.setValue(null);
    this.form.get('endDate')?.setValue(new Date().toISOString().split('T')[0]);
    this.currentStartDate = null;
    this.currentEndDate = null;
    this.currentPage = 1;
    this.getOperations();
  }

  private updatePageNumbers() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
