import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.coinranking.com/v2/coins';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getCryptoData(): Observable<any> {
    const url = `${this.proxyUrl}${this.baseUrl}`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error:', error);
        throw error; 
      })
    );
  }
}
