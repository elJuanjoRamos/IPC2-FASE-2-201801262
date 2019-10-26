import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable(/*{ providedIn: 'root' }*/)
export class TicketService {
    URI = 'http://localhost:3000/api';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('id')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/ticket`).pipe(map(data => {
                return data;
            }));
    }
    getMisTickets(id:any) {
        return this.http.get<any[]>(`${this.URI}/ticket/${id}`).pipe(map(data => {
                return data;
            }));
    }
    
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.delete(`${this.URI}/ticket/${id}`, { headers }).pipe(map(data => {
            console.log(data);
            return data;
        }));
    }
    post(ticket:any) {
        let data = JSON.stringify(ticket);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.post(`${this.URI}/ticket/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(ticket:any, id:any) {
        let data = JSON.stringify(ticket);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/ticket/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

}
