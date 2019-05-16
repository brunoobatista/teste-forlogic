import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesNovoComponent } from './clientes-novo/clientes-novo.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesListaComponent,
  },
  {
    path: 'novo',
    component: ClientesNovoComponent,
  },
  {
    path: ':id',
    component: ClientesNovoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
