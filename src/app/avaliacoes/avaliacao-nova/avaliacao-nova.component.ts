import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { BsDatepickerConfig, BsDatepickerViewMode, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AvaliacaoService } from '../avaliacao.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-avaliacao-nova',
  templateUrl: './avaliacao-nova.component.html',
  styleUrls: ['./avaliacao-nova.component.scss']
})
export class AvaliacaoNovaComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  formulario: FormGroup;
  fb = new FormBuilder();

  quantidadeGeral: number;

  items: Array<any> = [];
  itemsTemp: Array<any> = [];

  clientes: any = [];
  title: string;

  avaliacoes: any = [];

  bsConfig: Partial<BsDatepickerConfig>;
  minMode: BsDatepickerViewMode = 'month';

  refMin: Date;

  disableSelect = true;
  porcEscolha = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private localeService: BsLocaleService,
    private avaliacaoService: AvaliacaoService,
  ) {
    this.localeService.use('pt-br');
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat: 'MM-YYYY',
    });

  }

  ngOnInit() {
    this.configurarForm();
    this.avaliacaoService.get()
      .then(response => {
        this.avaliacoes = response;

        const size = this.avaliacoes.length;
        if (size > 0) {
          const data = this.avaliacoes[size - 1]['referencia'];
          const dataArr = data.split('-');

          this.refMin = new Date(dataArr[1], dataArr[0]);
        }

      });

    this.clienteService.getAll()
      .then(response => {
        this.itemsTemp = response;
      });


    this.title = 'Agendar';
  }


  salvar() {
    this.addAvaliacao();
  }

  addAvaliacao() {
    this.formulario.get('clientes').setValue(this.clientes);
    if (this.formulario.status !== 'INVALID' && this.porcEscolha) {
      const date = formatDate(this.formulario.get('referencia').value, 'MM-yyyy', 'pt-BR');
      this.formulario.get('referencia').setValue(date);
      this.avaliacaoService.add(this.formulario.value)
        .then(response => {
          setTimeout(() => {
          }, 1000);
          this.router.navigate(['/avaliacoes']);
        });
    } else {

      this.input.nativeElement.classList.remove('show-msg');
      setTimeout(() => {
        this.input.nativeElement.classList.add('show-msg');
      }, 7000);
    }
  }

  setDate(event) {
    if (event) {
      const dateSpl = formatDate(event, 'MM-yyyy', 'pt-BR').split('-');
      let zero = '';
      if (Number(dateSpl[0]) < 10) {
        zero = '0';
      }

      const data2 = `${zero}${Number(dateSpl[0]) - 2}-${dateSpl[1]}`;
      const data1 = `${zero}${Number(dateSpl[0]) - 1}-${dateSpl[1]}`;
      const arrTemp = [];
      for (const a of this.avaliacoes) {
        if (a.referencia === `${data2}`) {
          for (const c of a.clientes) {
            arrTemp.push(c.id);
          }
        }
        if (a.referencia === `${data1}`) {
          for (const c of a.clientes) {
            arrTemp.push(c.id);
          }
        }
      }
      this.items = [];
      for (const it of this.itemsTemp) {
        if (arrTemp.indexOf(it.id) < 0) {
          this.items.push(it);
        }
      }
      this.disableSelect = false;
    } else {
      this.disableSelect = true;
    }
  }

  insertCLiente(event) {
    this.clientes = [];
    event.forEach(e => {
      this.clientes.push({id: e.data.id, nome: e.data.nome, nps: '', motivo: ''});
    });
    let quantidade = 20 / 100 * this.itemsTemp.length ;
    quantidade = Math.ceil(quantidade);
    this.quantidadeGeral = quantidade;
    if (event.length >= quantidade) {
      this.porcEscolha = true;
    } else {
      this.porcEscolha = false;
    }
  }

  configurarForm() {
    this.formulario = this.fb.group({
      referencia: ['', Validators.required],
      clientes: [this.fb.array([]), Validators.required]
    });
  }



}
