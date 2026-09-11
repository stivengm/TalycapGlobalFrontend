import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpAppService {

  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: {
    params?: HttpParams | { [param: string]: string | number | boolean };
    headers?: HttpHeaders | { [header: string]: string | string[] };
  }): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, body: any, options?: {
    params?: HttpParams | { [param: string]: string | number | boolean };
    headers?: HttpHeaders | { [header: string]: string | string[] };
  }): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  put<T>(url: string, body: any, options?: {
    params?: HttpParams | { [param: string]: string | number | boolean };
    headers?: HttpHeaders | { [header: string]: string | string[] };
  }): Observable<T> {
    return this.http.put<T>(url, body, options);
  }

  patch<T>(url: string, body: any, options?: {
    params?: HttpParams | { [param: string]: string | number | boolean };
    headers?: HttpHeaders | { [header: string]: string | string[] };
  }): Observable<T> {
    return this.http.patch<T>(url, body, options);
  }

  delete<T>(url: string, options?: {
    params?: HttpParams | { [param: string]: string | number | boolean };
    headers?: HttpHeaders | { [header: string]: string | string[] };
  }): Observable<T> {
    return this.http.delete<T>(url, options);
  }

}