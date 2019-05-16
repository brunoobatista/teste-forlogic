import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { AvaliacaoService } from '../avaliacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-avaliacao-executar',
  templateUrl: './avaliacao-executar.component.html',
  styleUrls: ['./avaliacao-executar.component.scss']
})
export class AvaliacaoExecutarComponent implements OnInit {

  avId: string;
  clId: string;

  avaliacao: any;
  cliente: any;
  formulario: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private avaliacaoService: AvaliacaoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.configurarForm();

    this.avId = this.route.snapshot.params['avaliacao'];
    this.clId = this.route.snapshot.params['cliente'];

    this.avaliacaoService.getById(this.avId)
      .then(response => {
        this.avaliacao = response;
      });

    this.clienteService.getById(this.clId)
      .then(response => {
        this.cliente = response;
      });

  }

  salvar() {
    if (this.formulario.status !== 'INVALID') {
      this.avaliacao.clientes.forEach(c => {
        if (c.id === this.clId) {
          c.nps = this.formulario.get('nps').value;
          c.motivo = this.formulario.get('motivo').value;
          this.cliente.sinalizador = this.formulario.get('nps').value;
        }
      });

      this.clienteService.put(this.cliente, this.clId)
        .then(response => {
          console.log(response);
        });

      this.verificarAvaliacaoFinalizada();

      /* this.avaliacaoService.put(this.avaliacao, this.avId)
          .then(response => {
            console.log(response);
          });*/
      this.router.navigate(['/'])
    }
  }

  verificarAvaliacaoFinalizada() {
    const size = this.avaliacao.clientes.length;
    let verif = 0;
    for (const c of this.avaliacao.clientes) {
      if (c.nps) {
        verif += 1;
      }
    }

    if (size === verif) {
      const $this = this;
      setTimeout(function() {
        const nps = $this.calcularNps();
        $this.avaliacao.nps = nps;
        $this.avaliacaoService.put($this.avaliacao, $this.avId)
          .then(response => {
            console.log(response);
          });
      }, 50);
    } else {
      this.avaliacaoService.put(this.avaliacao, this.avId)
          .then(response => {
            console.log(response);
          });
    }
  }

  calcularNps() {
    const promotores = this.calcularPromotores(this.avaliacao.clientes);
    const detratores = this.calcularDetratores(this.avaliacao.clientes);
    const totalParticitantes = this.avaliacao.clientes.length;

    return ((promotores - detratores) / totalParticitantes) * 100;
  }

  calcularPromotores(clientes: any) {
    let total = 0;
    for (const c of clientes) {
      if (c.nps >= 9) {
        total += 1;
      }
    }
    return total;
  }

  calcularDetratores(clientes: any) {
    let total = 0;
    for (const c of clientes) {
      if (c.nps >= 0 && c.nps <= 6) {
        total += 1;
      }
    }
    return total;
  }

  configurarForm() {
    this.formulario = this.fb.group({
      nps: ['', Validators.required],
      motivo: ['', Validators.required]
    });
  }

}
