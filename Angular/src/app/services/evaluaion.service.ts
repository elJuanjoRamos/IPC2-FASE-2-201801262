import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class EvaluacionService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/evaluacion`).pipe(map(data => {
                return data;
            }));
    }
    getActive() {
        return this.http.get<any[]>(`${this.URI}/evaluacions/activos`).pipe(map(data => {
                return data;
            }));
    }
    getSeccion() {
        return this.http.get<any[]>(`${this.URI}/seccion`).pipe(map(data => {
                return data;
            }));
    }
    getEvaluacion(id: any) {
        return this.http.get<any>(`${this.URI}/evaluacion/${id}`).pipe(map(data => {
                return data;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/evaluacion/${id}`, { headers }).pipe(map(data => {
            console.log(data);
            return data;
        }));
    }
    post(evaluacion:any) {
        let data = JSON.stringify(evaluacion);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/evaluacion/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(evaluacion:any, id:any) {
        let data = JSON.stringify(evaluacion);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/evaluacion/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

}
