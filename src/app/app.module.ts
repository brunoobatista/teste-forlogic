import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClienteService } from './clientes/cliente.service';
import { AvaliacaoService } from './avaliacoes/avaliacao.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    ClienteService,
    AvaliacaoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
