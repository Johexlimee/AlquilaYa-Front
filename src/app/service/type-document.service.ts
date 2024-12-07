import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';

export interface TypeDocument {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  
  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

  // Método para registrar un nuevo tipo de documento
  public addTypeDocument(name: string, description: string): Observable<TypeDocument | null> {
    const typeDocumentData = { name, description };
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .post<TypeDocument>(`${this.apiUrl}admin/typedocuments-add`, typeDocumentData, { headers })
      .pipe(
        tap((response) => {
          console.log('Respuesta completa del servidor:', response);
          if (response.id) {
            console.log('Registro exitoso:', response);
            this.alertService.showSuccess('Tipo de documento agregado con éxito.');
          }
        }),
        catchError((error) => {
          console.error('Error en el registro:', error);
          this.alertService.showError('No se pudo agregar el tipo de documento.');
          return of(null);
        })
      );
  }

  // Método para actualizar un tipo de documento
  public updateTypeDocument(id: number, name: string): Observable<TypeDocument | null> {
    const typeDocumentData = { id, name};
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .put<TypeDocument>(`${this.apiUrl}admin/typedocuments-update?id=${id}`, typeDocumentData, { headers })
      .pipe(
        tap((response) => {
          console.log('Actualización:', response);
          if (response.id) {
            console.log('Actualización exitosa:', response);
            this.alertService.showSuccess('El tipo de documento se actualizó con éxito.');
          }
        }),
        catchError((error) => {
          console.error('Error en la actualización:', error);
          this.alertService.showError('No se pudo actualizar el tipo de documento.');
          return of(null);
        })
      );
  }

  // Método para obtener todos los tipos de documentos
  public getAllTypeDocuments(): Observable<TypeDocument[]> {
    return this.http.get<TypeDocument[]>(`${this.apiUrl}public/typedocuments-all`).pipe(
      catchError((error) => {
        console.error('Error al obtener tipos de documentos:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  // Método para obtener un tipo de documento por ID
  public getTypeDocumentById(id: number): Observable<TypeDocument | null> {
    return this.http.get<TypeDocument>(`${this.apiUrl}public/typedocuments-user?id=${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el tipo de documento por ID:', error);
        return of(null); // Retorna null en caso de error
      })
    );
  }
}
