import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'use-toggle',
    pathMatch: 'full',
  },
  {
    path: 'use-toggle',
    loadComponent: () =>
      import('./examples/use-toggle-example.component').then((m) => m.UseToggleExampleComponent),
  },
];
