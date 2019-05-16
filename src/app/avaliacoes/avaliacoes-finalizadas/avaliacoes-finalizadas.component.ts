import { Component, OnInit } from '@angular/core';
import { AvaliacaoService, Avaliacao } from '../avaliacao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avaliacoes-finalizadas',
  templateUrl: './avaliacoes-finalizadas.component.html',
  styleUrls: ['./avaliacoes-finalizadas.component.scss'],
  providers: [DatePipe]
})
export class AvaliacoesFinalizadasComponent implements OnInit {

  avaliacoes: Array<Avaliacao> = new Array();
  constructor(private avaliacaoService: AvaliacaoService, private dp: DatePipe) { }

  ngOnInit() {
    this.avaliacaoService.get()
      .then(response => {
        this.verificarAvalizacaoFinalizada(response);
      });
  }

  verificarAvalizacaoFinalizada(avl: any) {
    for (const av of avl) {
      if (av.nps) {
        const myDate = av.referencia.replace(/(\d{2})-(\d{4})/, '/$2/$1');
        const newDate = this.dp.transform(myDate, 'MMMM, yyyy', 'BRT', 'pt-BR');
        
        av.referencia = newDate;
        this.avaliacoes.push(av);
      }
    }
  }

}
