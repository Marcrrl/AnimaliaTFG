import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'Animales',
    loadChildren: () => import('./animales/animales.module').then( m => m.AnimalesPageModule)
  },
  {
    path: 'detalles-animal/:id/:tipo',
    loadChildren: () => import('./detalles-animal/detalles-animal.module').then(m => m.DetallesAnimalPageModule)
  },
  {
    path: 'mapa/:tipo',
    loadChildren: () => import('./Mapa/Mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'IniciarSesion',
    loadChildren: () => import('./sign-form/sign-form.module').then( m => m.SignFormPageModule)
  },
  {
    path: 'Empresas',
    loadChildren: () => import('./empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
  {
    path: 'Registrarse',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'detalles-empresa/:id',
    loadChildren: () => import('./detalles-empresa/detalles-empresa.module').then( m => m.DetallesEmpresaPageModule)
  },
  {
    path: 'Gestion',
    loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionPageModule)
  },
  {
    path: 'rescates',
    loadChildren: () => import('./rescates/rescates.module').then( m => m.RescatesPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
