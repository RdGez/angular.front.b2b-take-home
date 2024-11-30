import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './core/infra/config/routes.config';
import { HistorialComponent } from './features/historial/infra/components/historial.component';
import { HomeComponent } from './features/home/infra/components/home.component';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/infra/components/login/login.component';
import { provideLogin } from './features/login/infra/config/providers';
import { AuthGuard } from './core/guards/auth.guard';
import { provideOperations } from './features/shared/infra/config/providers';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
  {
    path: ROUTE_CONFIG.login,
    component: LoginComponent,
    providers: [provideLogin()],
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
    providers: [provideLogin()],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_CONFIG.home,
      },
      {
        path: ROUTE_CONFIG.home,
        component: HomeComponent,
        providers: [provideOperations()],
        canActivate: [AuthGuard],
        data: { title: 'Home' },
      },
      {
        path: ROUTE_CONFIG.historial,
        component: HistorialComponent,
        providers: [provideOperations()],
        canActivate: [AuthGuard],
        data: { title: 'Historial' },
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
];
