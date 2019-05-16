import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { ClienteService, Cliente } from '../cliente.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent implements OnInit {

  clientes: any = [];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getAll()
      .then(response => {
        this.clientes = response;
      });
  }

  deleteCliente(cliente: any) {
    this.clienteService.delete(cliente.id)
      .then(response => {
        const index = this.clientes.indexOf(cliente);
        this.clientes.splice(index, 1);
      });
  }

}
