import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

export class Cliente {
  nome: string;
  contat: string;
  dataCadastro: string;
  sinalizador: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteUrl: string;

  constructor(private http: HttpClient) {
    this.clienteUrl = `${environment.apiUrl}/customers`;
  }

  add(cliente: Cliente): Promise<Cliente> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');

    return this.http.post<Cliente>(this.clienteUrl, cliente, { headers })
        .toPromise();
  }

  getAll(): Promise<any> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');

    return this.http.get<Cliente>(this.clienteUrl, { headers })
      .toPromise()
      .then(resp => {
        const arr = [];

        for (const rp in resp) {
          if (rp) {
            const obj = {
              id: rp,
              nome: resp[rp]['nome'],
              contato: resp[rp]['contato'],
              dataCadastro: resp[rp]['dataCadastro'],
              sinalizador: resp[rp]['sinalizador']
            };
            arr.push(obj);
          }
        }
        return arr;
      });
  }

  getById(id: any): Promise<any> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`, { headers })
        .toPromise()
        .then(response => {
          return response;
        });
  }

  put(cliente: Cliente, id: string): Promise<Cliente> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');

    return this.http.put<Cliente>(`${this.clienteUrl}/${id}`, cliente, { headers })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  delete(id: string): Promise<any> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');
    return this.http.delete<any>(`${this.clienteUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        console.log('delete response', response)
      });
  }

}
