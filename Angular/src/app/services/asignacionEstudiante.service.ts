import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class AsignacionEstudianteService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<any[]>(`${this.URI}/asignacion-estudiante`).pipe(map(data => {
                return data;
            }));
    }
    
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/asignacion-estudiante/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(dt:any) {
        let data = JSON.stringify(dt);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/asignacion-estudiante/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(dt:any, id:any) {
        let data = JSON.stringify(dt);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/asignacion-estudiante/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

}
