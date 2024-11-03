import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakeService {

  
  constructor(
    private http:HttpClient
  ) { }

  getDataV1(): Observable<any>{
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url);
  }

  getDataV2(): Observable<any>{
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError('failed to fetch data'))
    );
  }

  postDataV1(data: any){
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post(url, data, httpOptions);
  }

  private handleError<T>(operation = 'operation'){
    console.table(operation);
    return (error: HttpErrorResponse): Observable<T> => {
      // console.log(error);
      const message = `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    }
  }
}
