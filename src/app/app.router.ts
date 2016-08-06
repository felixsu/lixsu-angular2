import { provideRouter, RouterConfig } from '@angular/router';
import { AuthComponent } from './component/auth.component/auth.component';
import { DashboardComponent } from './component/dashboard.component/dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found.component/page-not-found.component';

const routes: RouterConfig = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
