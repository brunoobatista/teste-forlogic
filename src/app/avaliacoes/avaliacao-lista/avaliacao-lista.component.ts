import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../avaliacao.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avaliacao-lista',
  templateUrl: './avaliacao-lista.component.html',
  styleUrls: ['./avaliacao-lista.component.scss'],
  providers: [DatePipe]
})
export class AvaliacaoListaComponent implements OnInit {

  avaliacoes: Array<any> = [];
  link = '';
  constructor(
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private dp: DatePipe,
  ) {
    const linkArr = window.location.href.split('/');

    linkArr.forEach((item, index) => {
      if (index < linkArr.length - 1) {
        this.link += `${item}/`;
      }
    });
  }

  ngOnInit() {
      this.avaliacaoService.get()
        .then(resp => {
            for (const av of resp) {
              if (!av.nps) {
                this.avaliacoes.push(av);
              }
            }
        });

  }

  copyLinkToPaste(avaliacaoId: string, clienteId: string) {
    const l = `${this.link}executar/${avaliacaoId}/${clienteId}`;

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', l);
      e.preventDefault();
    };
    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
  }

  formatDateRef(date: any) {
    const myDate = date.replace(/(\d{2})-(\d{4})/, '/$2/$1');
    const newDate = this.dp.transform(myDate, 'MMMM, yyyy', 'BRT', 'pt-BR');

    return newDate;
  }

}
