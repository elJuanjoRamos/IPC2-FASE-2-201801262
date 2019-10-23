import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../api/models/usuario.model';


@Injectable(/*{ providedIn: 'root' }*/)
export class UsuarioService {
    URI = 'http://localhost:3000/api/';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/usuario`).pipe(map(user => {
                return user;
            }));
    }

    getUsuario(id: any) {
        return this.http.get<Usuario>(`${this.URI}/usuario/${id}`).pipe(map(user => {
                return user;
            }));
    }
    getAuxiliares() {
        return this.http.get<any[]>(`${this.URI}/auxiliar`).pipe(map(user => {
                return user;
            }));
    }
    getEstudiante(id: any) {
        return this.http.get<any[]>(`${this.URI}/estudiante/${id}`).pipe(map(user => {
                return user;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/usuario/${id}`, { headers }).pipe(map(user => {
            return user;
        }));
    }
    post(usuario:any) {
        let data = JSON.stringify(usuario);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/usuario/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
    put(usuario:any, id:any) {
        let data = JSON.stringify(usuario);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/usuario/${id}`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }

}
