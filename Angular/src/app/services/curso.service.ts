import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Curso } from '../api/models/curso.model';


@Injectable(/*{ providedIn: 'root' }*/)
export class CursoService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/curso`).pipe(map(data => {
                return data;
            }));
    }
    getActive() {
        return this.http.get<any[]>(`${this.URI}/cursos/activos`).pipe(map(data => {
                return data;
            }));
    }
    getSeccion() {
        return this.http.get<any[]>(`${this.URI}/seccion`).pipe(map(data => {
                return data;
            }));
    }
    getCurso(id: any) {
        return this.http.get<Curso>(`${this.URI}/curso/${id}`).pipe(map(data => {
                return data;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/curso/${id}`, { headers }).pipe(map(data => {
            console.log(data);
            return data;
        }));
    }
    post(curso:any) {
        let data = JSON.stringify(curso);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/curso/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(curso:any, id:any) {
        let data = JSON.stringify(curso);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/curso/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

}
