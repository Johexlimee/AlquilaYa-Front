import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl: string = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}public/categories-all`);
  }
}  