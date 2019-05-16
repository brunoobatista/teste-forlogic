import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';

import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-novo',
  templateUrl: './clientes-novo.component.html',
  styleUrls: ['./clientes-novo.component.scss']
})
export class ClientesNovoComponent implements OnInit {

  formulario: FormGroup;
  fb = new FormBuilder();
  title: string;
  id: string;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.configurarForm();
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.clienteService.getById(this.id)
        .then(response => this.formulario.patchValue(response));
      this.title = 'Editar';
    } else {
      this.title = 'Novo';
    }
  }

  salvar() {
    if (this.id) {
      this.putCliente();
    } else {
      this.addCliente();
    }
  }

  addCliente() {
    console.log(this.formulario.status);
    if (this.formulario.status !== 'INVALID') {
      this.clienteService.add(this.formulario.value)
        .then(response => {
          console.log('compoentent post', response);
          this.router.navigate(['/clientes']);
        });
    }
  }

  putCliente() {
    console.log('put', this.formulario.status);
    if (this.formulario.status !== 'INVALID') {
      this.clienteService.put(this.formulario.value, this.id)
        .then(response => {
          console.log('compoentent post', response);
          this.router.navigate(['/clientes']);
        });
    }
  }

  configurarForm() {
    this.formulario = this.fb.group({
      nome: new FormControl('', Validators.required),
      contato: new FormControl('', Validators.required),
      dataCadastro: new FormControl(formatDate(Date.now(), 'yyyy-MM-dd', 'pt'), Validators.required),
      sinalizador: new FormControl('')
    });
  }

}
