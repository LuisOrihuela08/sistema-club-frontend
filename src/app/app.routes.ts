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
        path: 'bungalows',
        loadComponent: () => import('./business/bungalows/bungalows.component').then(m => m.BungalowsComponent)
      },
      {
        path: 'hospedajes',
        loadComponent: () => import('./business/hospedajes/hospedajes.component').then(m => m.HospedajesComponent)
      },
      {
        path:'servicio-piscina',
        loadComponent: () => import('./business/servicio-piscina/servicio-piscina.component').then(m => m.ServicioPiscinaComponent)
      },
      {
        path: 'servicio-bungalow',
        loadComponent: () => import('./business/servicio-bungalow/servicio-bungalow.component').then(m => m.ServicioBungalowComponent)
      },
      {
        path: 'servicio-hospedaje',
        loadComponent: () => import('./business/servicio-hospedaje/servicio-hospedaje.component').then(m => m.ServicioHospedajeComponent)
      },
      {
        path:'servicio-piscina',
        redirectTo: 'servicio-piscina',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'servicio-piscina'
      }
    ]
  }

];
