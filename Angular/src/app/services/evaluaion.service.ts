import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class EvaluacionService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getAll(id: any) {
        console.log('el id es' + id);
        return this.http.get<any[]>(`${this.URI}/evaluaciones/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getAllEv(id: any) {
        return this.http.get<any[]>(`${this.URI}/ev/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getEvaluacion(id: any) {
        return this.http.get<any>(`${this.URI}/evaluacion/${id}`).pipe(map(data => {
            console.log(data);
                return data;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/evaluacion/${id}`, { headers }).pipe(map(data => {
            console.log(data);
            return data;
        }));
    }
    post(evaluacion:any) {
        let data = JSON.stringify(evaluacion);
        console.log(data);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/evaluacion/`, data, { headers }).pipe(map(d => {
            return d;
        }));
    }
    put(evaluacion:any, id:any) {
        let data = JSON.stringify(evaluacion);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/evaluacion/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

    ////DETALLE
    getAllDetalle(id: any) {
        return this.http.get<any[]>(`${this.URI}/det-evaluacion/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getDetEvaluacion(id: any) {
        return this.http.get<any>(`${this.URI}/det-evaluacion/${id}`).pipe(map(data => {
                return data;
            }));
    }

    deleteDet(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/det-evaluacion/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    postDet(evaluacion:any) {
        let data = JSON.stringify(evaluacion);
        return this.http.post(`${this.URI}/det-evaluacion/`, evaluacion).pipe(map(d => {
            return d;
        }));
    }
    putDet(evaluacion:any, id:any) {
        let data = JSON.stringify(evaluacion);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/det-evaluacion/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }


}
