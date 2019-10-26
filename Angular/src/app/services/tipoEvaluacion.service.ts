import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class TipoEvaluacionService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    getAll(id: any) {
        console.log('el id es ' + id)
        return this.http.get<any[]>(`${this.URI}/tipoevaluacion/${id}`).pipe(map(user => {
                return user;
            }));
    }

    postVF(tipo:any) {
        let data = JSON.stringify(tipo);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/evaluacionvf/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
    postSM(tipo:any) {
        let data = JSON.stringify(tipo);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/evaluacionsm/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }

}
