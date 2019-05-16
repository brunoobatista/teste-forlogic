import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoNovaComponent } from './avaliacao-nova/avaliacao-nova.component';
import { AvaliacaoListaComponent } from './avaliacao-lista/avaliacao-lista.component';
import { AvaliacaoExecutarComponent } from './avaliacao-executar/avaliacao-executar.component';
import { AvaliacoesFinalizadasComponent } from './avaliacoes-finalizadas/avaliacoes-finalizadas.component';
import { AvaliacoesShowComponent } from './avaliacoes-show/avaliacoes-show.component';

const routes: Routes = [
  {
    path: 'nova',
    component: AvaliacaoNovaComponent
  },
  {
    path: '',
    component: AvaliacoesFinalizadasComponent
  },
  {
    path: 'programadas',
    component: AvaliacaoListaComponent
  },
  {
    path: 'executar/:avaliacao/:cliente',
    component: AvaliacaoExecutarComponent
  },
  {
    path: ':id',
    component: AvaliacoesShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacoesRoutingModule { }
