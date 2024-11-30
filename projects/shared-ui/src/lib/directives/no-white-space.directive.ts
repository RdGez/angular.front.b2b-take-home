/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject, Input, input } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  standalone: true,
  selector: '[aplazoNoWhiteSpace]',
  host: {
    '(input)': 'sanitizeValue()',
  },
})
export class AplazoNoWhiteSpaceDirective {
  @Input() aplazoNoWhiteSpace: boolean = false;

  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(): void {
    if (!this.aplazoNoWhiteSpace) return;

    const inputElement = this.#elementRef.nativeElement;
    const sanitizedValue = inputElement.value.replace(/\s/g, '');

    if (this.#ngControl && this.#ngControl.control) {
      this.#ngControl.control.setValue(sanitizedValue, { emitEvent: false });
    } else {
      inputElement.value = sanitizedValue;
    }
  }
}
