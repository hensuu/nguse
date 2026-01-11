import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'functions',
        pathMatch: 'full',
      },
      {
        path: 'functions',
        loadComponent: () =>
          import('./pages/functions-list/functions-list.component').then(
            (m) => m.FunctionsListComponent
          ),
      },
      {
        path: 'functions/:slug',
        loadComponent: () =>
          import('./pages/function-detail/function-detail.component').then(
            (m) => m.FunctionDetailComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'functions',
  },
];
