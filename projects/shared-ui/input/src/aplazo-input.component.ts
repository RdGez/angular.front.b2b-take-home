import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AplazoLowercaseDirective, AplazoNoWhiteSpaceDirective } from "@apz/shared-ui";

@Component({
  selector: 'aplz-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AplazoNoWhiteSpaceDirective, AplazoLowercaseDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AplazoInputComponent),
      multi: true
    }
  ],
  template: `
  <div class="relative">
    <div class="relative">
      <input
        [id]="id"
        [type]="isPasswordVisible ? 'text' : type"
        [placeholder]="placeholder"
        (input)="onInput($event)"
        [value]="value"
        [aplazoLowercase]="applyLowerCase"
        [aplazoNoWhiteSpace]="applyNoWhiteSpace"
        class="bg-white border-2 border-dark-secondary text-dark rounded-lg focus:ring-special-info focus:border-special-info block w-full p-2.5"
      />
      <button
          *ngIf="type === 'password'"
          type="button"
          (click)="togglePassword()"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-dark-secondary w-6 h-6 flex items-center justify-center"
        >
          <ng-container *ngIf="isPasswordVisible; else showPassword">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
              <defs>
              </defs>
              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
              	<path d="M 13.148 79.853 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 63.705 -63.705 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 L 15.269 78.974 C 14.684 79.56 13.916 79.853 13.148 79.853 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              	<path d="M 25.296 67.703 c -0.504 0 -1.012 -0.127 -1.474 -0.388 C 16.105 62.961 8.323 56.098 0.693 46.918 c -0.924 -1.112 -0.924 -2.724 0 -3.835 c 21.533 -25.904 43.565 -32.767 65.485 -20.399 c 0.816 0.461 1.371 1.277 1.498 2.207 s -0.188 1.864 -0.852 2.527 L 27.418 66.824 C 26.841 67.402 26.073 67.703 25.296 67.703 z M 6.933 45 c 5.972 6.896 11.974 12.242 17.891 15.934 l 34.842 -34.842 C 42.131 18.098 24.824 24.311 6.933 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              	<path d="M 34.394 58.606 c -0.795 0 -1.558 -0.315 -2.121 -0.878 C 28.873 54.329 27 49.809 27 45 c 0 -9.925 8.075 -18 18 -18 c 4.749 0 9.23 1.833 12.617 5.163 c 0.569 0.56 0.893 1.322 0.897 2.12 s -0.308 1.565 -0.869 2.132 L 36.524 57.719 c -0.562 0.566 -1.326 0.886 -2.124 0.888 C 34.398 58.606 34.396 58.606 34.394 58.606 z M 45 33 c -6.617 0 -12 5.383 -12 12 c 0 2.175 0.574 4.261 1.651 6.085 L 50.995 34.6 C 49.19 33.556 47.136 33 45 33 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              	<path d="M 44.973 73.26 c -3.552 0 -7.104 -0.501 -10.657 -1.505 c -1.594 -0.45 -2.521 -2.108 -2.071 -3.703 c 0.45 -1.594 2.105 -2.524 3.703 -2.07 C 51.38 70.341 67.226 63.287 83.066 45 c -3.977 -4.592 -7.98 -8.514 -11.925 -11.68 c -1.292 -1.037 -1.499 -2.925 -0.462 -4.218 c 1.038 -1.292 2.927 -1.499 4.218 -0.462 c 4.796 3.849 9.644 8.708 14.409 14.442 c 0.925 1.111 0.925 2.724 0 3.835 C 74.743 64.438 59.874 73.26 44.973 73.26 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              	<path d="M 45 63 c -0.386 0 -0.77 -0.013 -1.149 -0.036 c -1.654 -0.101 -2.913 -1.523 -2.812 -3.178 c 0.102 -1.652 1.527 -2.909 3.178 -2.811 C 44.476 56.991 44.737 57 45 57 c 6.617 0 12 -5.383 12 -12 c 0 -0.27 -0.009 -0.538 -0.026 -0.803 c -0.107 -1.653 1.146 -3.081 2.799 -3.188 c 1.665 -0.103 3.082 1.146 3.189 2.799 C 62.987 44.202 63 44.599 63 45 C 63 54.925 54.925 63 45 63 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              </g>
            </svg>
          </ng-container>
          <ng-template #showPassword>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
              <defs>
              </defs>
              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
              	<path d="M 45 73.264 c -14.869 0 -29.775 -8.864 -44.307 -26.346 c -0.924 -1.112 -0.924 -2.724 0 -3.836 C 15.225 25.601 30.131 16.737 45 16.737 c 14.868 0 29.775 8.864 44.307 26.345 c 0.925 1.112 0.925 2.724 0 3.836 C 74.775 64.399 59.868 73.264 45 73.264 z M 6.934 45 C 19.73 59.776 32.528 67.264 45 67.264 c 12.473 0 25.27 -7.487 38.066 -22.264 C 70.27 30.224 57.473 22.737 45 22.737 C 32.528 22.737 19.73 30.224 6.934 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              	<path d="M 45 62 c -9.374 0 -17 -7.626 -17 -17 s 7.626 -17 17 -17 s 17 7.626 17 17 S 54.374 62 45 62 z M 45 34 c -6.065 0 -11 4.935 -11 11 s 4.935 11 11 11 s 11 -4.935 11 -11 S 51.065 34 45 34 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              </g>
            </svg>
          </ng-template>
        </button>
    </div>
    <label [for]="id" class="absolute bg-white px-2 left-3 top-0 transform -translate-y-1/2 text-sm font-medium text-dark">
      {{ label }}
    </label>
    <span *ngIf="error" class="absolute text-sm text-alert-critical-icon bottom-[-20px]">{{ error }}</span>
  </div>
  `,
  styleUrls: ['./aplazo-input.component.css']
})
export class AplazoInputComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() error?: string;
  @Input() placeholder: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() applyLowerCase: boolean = false;
  @Input() applyNoWhiteSpace: boolean = false;

  isPasswordVisible = false;
  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}