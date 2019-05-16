import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';
import { Cliente } from '../clientes/cliente.service';

export class Avaliacao {
  referencia: string;
  clientes: Array<any>;
  nps: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  avaliacaoUrl: string;

  constructor(private http: HttpClient) {
    this.avaliacaoUrl = `${environment.apiUrl}/evaluations`;
  }

  add(avaliacao: Avaliacao): Promise<Avaliacao> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');

    return this.http.post<Avaliacao>(this.avaliacaoUrl, avaliacao, { headers })
        .toPromise();
  }

  get(): Promise<any> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');
    return this.http.get<any>(this.avaliacaoUrl, { headers })
      .toPromise()
      .then(resp => {
        const arr = [];

        for (const rp in resp) {
          if (rp) {
            const obj = {
              id: rp,
              referencia: resp[rp]['referencia'],
              clientes: resp[rp]['clientes'],
              nps: resp[rp]['nps'],
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
    return this.http.get<Cliente>(`${this.avaliacaoUrl}/${id}`, { headers })
        .toPromise()
        .then(response => {
          return response;
        });
  }

  put(avaliacao: Avaliacao, id: string): Promise<Avaliacao> {
    const headers = new HttpHeaders()
            .append('Authorization', 'teste-forlogic-39994');

    return this.http.put<Avaliacao>(`${this.avaliacaoUrl}/${id}`, avaliacao, { headers })
      .toPromise()
      .then(response => {
        return response;
      });
  }

}
