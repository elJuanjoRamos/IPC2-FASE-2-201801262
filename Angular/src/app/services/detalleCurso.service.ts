import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class DetalleCursoService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/curso-detalle`).pipe(map(user => {
                return user;
            }));
    }
    getDet(id: any) {
        return this.http.get<any[]>(`${this.URI}/curso-det/${id.idUsuario}`).pipe(map(user => {
                return user;
            }));
    }

    getDetalle(id: any) {
        return this.http.get<any>(`${this.URI}/curso-detalle/${id}`).pipe(map(user => {
                return user;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/curso-detalle/${id}`, { headers }).pipe(map(user => {
            return user;
        }));
    }
    post(detallecurso:any) {
        let data = JSON.stringify(detallecurso);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/curso-detalle/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
    put(detallecurso:any, id:any) {
        console.log(detallecurso);
        let data = JSON.stringify(detallecurso);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/curso-detalle/${id}`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }

}
