/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[aplazoLowercase]',
  host: {
    '(input)': 'sanitizeValue($event)',
  },
})
export class AplazoLowercaseDirective {
  @Input() aplazoLowercase: boolean = false;

  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(event: InputEvent): void {
    if (!this.aplazoLowercase) return;

    const inputElement = this.#elementRef.nativeElement;
    const sanitizedValue = inputElement.value.toLowerCase();

    if (this.#ngControl && this.#ngControl.control) {
      this.#ngControl.control.setValue(sanitizedValue, { emitEvent: false });
    } else {
      inputElement.value = sanitizedValue;
    }
  }
}
