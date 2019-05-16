import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../avaliacao.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avaliacoes-show',
  templateUrl: './avaliacoes-show.component.html',
  styleUrls: ['./avaliacoes-show.component.scss'],
  providers: [DatePipe]
})
export class AvaliacoesShowComponent implements OnInit {

  avaliacao = [];

  constructor(
    private avaliacaoService: AvaliacaoService,
    private route: ActivatedRoute,
    private dp: DatePipe) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.avaliacaoService.getById(id)
      .then(response => {

        const myDate = response.referencia.replace(/(\d{2})-(\d{4})/, '/$2/$1');
        const newDate = this.dp.transform(myDate, 'MMMM, yyyy', 'BRT', 'pt-BR');

        response.referencia = newDate;
        this.avaliacao = response;
      });
  }


}
