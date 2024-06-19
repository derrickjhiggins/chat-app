import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private apiUrl: string = "http://localhost:3001";

    constructor(private http: HttpClient){}

    sendMessage(messagePayload: { message: string }): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl + '/get_response', messagePayload, { headers });
      }
}
