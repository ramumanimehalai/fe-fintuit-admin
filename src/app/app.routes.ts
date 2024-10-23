import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { UnAuthGuard } from './guard/unauth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Theme/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./Authentication/login.module').then((m) => m.LoginModule),
        canActivate: [UnAuthGuard],
      },
    ],
  },
];
