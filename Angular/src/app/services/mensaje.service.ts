import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class MensajeService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    get(id: any) {
        return this.http.get<any>(`${this.URI}/mensaje/${id}`).pipe(map(msg => {
                return msg;
            }));
    }

    getMisMensajes(id: any) {
        return this.http.get<any[]>(`${this.URI}/mismensajes/${id}`).pipe(map(msg => {
                return msg;
            }));
    }
    getMensajesEnviados(id: any) {
        return this.http.get<any[]>(`${this.URI}/mensajesenviados/${id}`).pipe(map(msg => {
                return msg;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/mensaje/${id}`, { headers }).pipe(map(msg => {
            return msg;
        }));
    }
    post(mensaje:any) {
        let data = JSON.stringify(mensaje);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/mensaje/`, data, { headers }).pipe(map(msg => {
            return msg;
        }));
    }

    put(mensaje:any, id:any) {
        let data = JSON.stringify(mensaje);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/mensaje/${id}`, data, { headers }).pipe(map(msg => {
            return msg;
        }));
    }

}
