import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations"

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 8000,
      preventDuplicates: true,
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr custom-toast',
    }),
  ]
};
