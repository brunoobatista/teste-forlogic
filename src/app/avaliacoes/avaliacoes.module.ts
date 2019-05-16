import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AvaliacoesRoutingModule } from './avaliacoes-routing.module';
import { AvaliacaoNovaComponent } from './avaliacao-nova/avaliacao-nova.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';

import { SharedModule } from '../shared/shared.module';

import * as locales from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { AvaliacaoListaComponent } from './avaliacao-lista/avaliacao-lista.component';
import { AvaliacaoExecutarComponent } from './avaliacao-executar/avaliacao-executar.component';
import { AvaliacoesFinalizadasComponent } from './avaliacoes-finalizadas/avaliacoes-finalizadas.component';
import { AvaliacoesShowComponent } from './avaliacoes-show/avaliacoes-show.component';

function defineLocales() {
  for (const locale in locales) {
    if (locale) {
      defineLocale(locales[locale].abbr, locales[locale]);
    }
  }
}
defineLocales();

@NgModule({
  declarations: [AvaliacaoNovaComponent, AvaliacaoListaComponent, AvaliacaoExecutarComponent, AvaliacoesFinalizadasComponent, AvaliacoesShowComponent],
  imports: [
    CommonModule,
    AvaliacoesRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class AvaliacoesModule { }
