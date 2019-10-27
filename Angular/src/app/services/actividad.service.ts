import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable(/*{ providedIn: 'root' }*/)
export class ActividadService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/actividad`).pipe(map(data => {
                return data;
            }));
    }
    getActividad(id: any) {
        return this.http.get<any>(`${this.URI}/actividad/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getMisActividades(id: any) {
        return this.http.get<any[]>(`${this.URI}/actividad/miactividad/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getMyActiv(id: any) {
        return this.http.get<any[]>(`${this.URI}/miactiv/${id}`).pipe(map(data => {
                return data;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/actividad/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(actividad:any) {
        let data = JSON.stringify(actividad);
        console.log(actividad);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/actividad/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(actividad:any, id:any) {
        let data = JSON.stringify(actividad);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/actividad/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

    postRespuesta(actividad: any) {
        let data = JSON.stringify(actividad);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/miactividad/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

}
