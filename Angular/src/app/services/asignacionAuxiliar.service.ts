import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class AsignacionAuxiliarService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<any[]>(`${this.URI}/asignacion-auxiliar`).pipe(map(data => {
                return data;
            }));
    }
    getAsig(id:any) {
        return this.http.get<any[]>(`${this.URI}/asignacion-auxiliar/view/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getAsigEst(id:any) {
        return this.http.get<any[]>(`${this.URI}/asignacion-auxiliar/est/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getMyCourse(id:any) {
        return this.http.get<any>(`${this.URI}/asignacion-auxiliar/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getMyStudents(id:any) {
        return this.http.get<any>(`${this.URI}/asignacion-auxiliar/alumnos/${id}`).pipe(map(data => {
                return data;
            }));
    }
    
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/asignacion-auxiliar/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(dt:any) {
        console.log(localStorage)
        let data = JSON.stringify(dt);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/asignacion-auxiliar/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(dt:any, id:any) {
        let data = JSON.stringify(dt);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/asignacion-auxiliar/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    verificar(dt:any) {
        let data = JSON.stringify(dt);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/verificar/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
}
