import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesNovoComponent } from './clientes-novo/clientes-novo.component';
import { SharedModule } from '../shared/shared.module';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

@NgModule({
  declarations: [ClientesNovoComponent, ClientesListaComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    SharedModule
  ]
})
export class ClientesModule { }
