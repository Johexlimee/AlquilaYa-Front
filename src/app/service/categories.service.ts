import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';

interface Category {
  categoryId: number;
  name: string;
  description: string;
}

type Categories = Category[];

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl: string = 'http://localhost:8080/api/v1/';
  
  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

  // Método para registrar una nueva categoría
  public addCategory(name: string, description: string): Observable<Category | null> {
    const categoryData = { name, description }; // Enviar name y description
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

   return this.http
      .post<Category>(`${this.apiUrl}admin/category-add`, categoryData, { headers })
      .pipe(
        tap((response) => {
          console.log('Respuesta completa del servidor:', response);
          if (response) {
            console.log('Registro exitoso:', response);
            this.alertService.showSuccess('Categoría registrada con éxito.');
          }
        }),
        catchError((error) => {
          console.error('Error en el registro:', error);
          this.alertService.showError('No se pudo registrar la categoría.');
          return of(null);
        })
      );
  }

  // Método para actualizar una categoría
  public updateCategory(categoryId: number, name: string, description: string): Observable<Category | null> {
    const categoryData = { name, description }; // Enviar name y description
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .put<Category>(`${this.apiUrl}admin/category-update?id=${categoryId}`, categoryData, { headers })
      .pipe(
        tap((response) => {
          console.log('Actualización:', response);
          if (response && response.categoryId) { // Aquí validas el id correcto
            console.log('Actualización exitosa:', response);
            this.alertService.showSuccess('Categoría actualizada con éxito.');
          }
        }),
        catchError((error) => {
          console.error('Error en la actualización:', error);
          this.alertService.showError('No se pudo actualizar la categoría.');
          return of(null);
        })
      );
  }

  // Método para obtener todas las categorías
  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}public/category-all`).pipe(
      catchError((error) => {
        console.error('Error al obtener categorías:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

   /*// Método para eliminar una categoría
  public deleteCategory(categoryId: number): Observable<boolean> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

   return this.http
      .delete(`${this.apiUrl}admin/category-delete?id=${categoryId}`, { headers })
      .pipe(
        tap(() => {
          console.log('Eliminación exitosa');
          this.alertService.showSuccess('La categoría fue eliminada con éxito.');
        }),
        catchError((error) => {
          console.error('Error al eliminar categoría:', error);
          this.alertService.showError('No se pudo eliminar la categoría.');
          return of(false);
        })
      );*/
  }

