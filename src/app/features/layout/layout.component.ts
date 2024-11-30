import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '../../../../projects/shared-ui/sidenav/src';
import { ROUTE_CONFIG } from '../../core/infra/config/routes.config';
import { LoginRepository } from '../login/domain/repositories/login.repository';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);
  readonly #loginRepository = inject(LoginRepository);
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly appRoutes = ROUTE_CONFIG;
  pageTitle = '';

  ngOnInit(): void {
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.#activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map(route => route.snapshot.data['title'])
    ).subscribe(title => {
      if (title) {
        this.pageTitle = title;
        this.#titleService.setTitle(title);
      }
    });

    const initialTitle = this.#activatedRoute.snapshot.firstChild?.data['title'];
    if (initialTitle) {
      this.pageTitle = initialTitle;
      this.#titleService.setTitle(initialTitle);
    }
  }


  clickLogo(): void {
    this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
  }

  logOut(): void {
    this.#loginRepository.logOut().subscribe();
    this.#router.navigate([ROUTE_CONFIG.login]);
  }
}
