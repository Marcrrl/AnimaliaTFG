import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'Camara',
        loadChildren: () => import('../Camara/Camara.module').then(m => m.CamaraPageModule)
      },
      {
        path: 'Animales',
        loadChildren: () => import('../animales/animales.module').then(m => m.AnimalesPageModule)
      },
      {
        path: 'Empresas',
        loadChildren: () => import('../empresas/empresas.module').then(m => m.EmpresasPageModule)
      },
      {
        path: 'IniciarSesion',
        loadChildren: () => import('../sign-form/sign-form.module').then(m => m.SignFormPageModule)
      },
      {
        path: 'Perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'Registrarse',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'Gestion',
        loadChildren: () => import('../gestion/gestion.module').then(m => m.GestionPageModule)
      },
      {
        path: 'Rescates',
        loadChildren: () => import('../rescates/rescates.module').then(m => m.RescatesPageModule)
      },
      {
        path: 'Inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: '',
        redirectTo: '/Inicio',
        pathMatch: 'full'
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
