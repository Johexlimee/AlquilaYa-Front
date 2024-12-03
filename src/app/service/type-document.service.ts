import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient, private router: Router) { }

  public getAllTipeDocument(): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}public/typedocuments-all`);
  }
}  

