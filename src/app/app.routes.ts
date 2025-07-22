import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'metodos-pago',
        loadComponent:() => import('./business/metodos-pago/metodos-pago.component').then(m => m.MetodosPagoComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./business/clientes/clientes.component').then(m => m.ClientesComponent)
      },
      {
        path:'clientes',
        redirectTo: 'clientes',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'clientes'
      }
    ]
  }

];
