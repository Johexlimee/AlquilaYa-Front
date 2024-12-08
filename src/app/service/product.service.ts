import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { AuthcontrollerService } from './authcontroller.service';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  alertService: any;
  constructor(private http: HttpClient, private router: Router,private authService: AuthcontrollerService) { }

  public getAllProducts(): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}public/all-products`);
  }

  public getAllProductsUser(): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
  
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(`${this.apiUrl}customer/product-user`, { headers });
      }),
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return throwError(() => new Error('No se pudo obtener los productos. Inténtalo de nuevo más tarde.'));
      })
    );
  }




  public addProduct(
    name: string,
    description: string,
    price: number,
    productCondition: string,
    categoryId: number
  ): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
  
        // Decodificar el userId desde el token
        const userId = this.authService.decodeTokenAndGetUserId(token);
        if (!userId) {
          throw new Error('No se pudo obtener el userId del token');
        }
  
        const registerData = {
          name,
          description,
          price,
          productCondition,
          category: {
            categoryId: categoryId
          },
          supplier: { userId: userId },
        };
  
        console.log("register", registerData);
  
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        return this.http.post<{ productId: number }>(
          `${this.apiUrl}user/add-products`,
          registerData,
          { headers }
        );
      }),
      tap((response) => {
        // Verificar que la respuesta sea válida antes de mostrar el mensaje
        if (response && response.productId) {
          console.log("Producto agregado:", response);
        } else {
          // Si la respuesta no contiene un productId, mostrar un mensaje de error
          this.alertService.showError('No se pudo agregar el producto. Inténtalo de nuevo.');
        }
      }),
      catchError((error) => {
        console.error('Error al agregar el producto:', error);
        return of(null);
      })
    );
  }
  
  
  public editProduct(
    productId: number,
    name: string,
    description: string,
    price: number,
    productCondition: string,
    categoryId: number
  ): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
  
        // Decodificar el userId desde el token
        const userId = this.authService.decodeTokenAndGetUserId(token);
        if (!userId) {
          throw new Error('No se pudo obtener el userId del token');
        }
  
        const editData = {
          name,
          description,
          price,
          productCondition,
          category: {
            categoryId: categoryId
          },
          supplier: { userId: userId },
        };
  
        console.log("edit", editData);
  
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
        // Hacemos la solicitud PUT para editar el producto
        const params = new HttpParams().set('id', productId.toString()); // Pasamos el productId en los parámetros de la URL
        return this.http.put<{ productId: number }>(
          `${this.apiUrl}user/update-product`,
          editData,
          { headers, params }
        );
      }),
      tap((response) => {
        // Verificar que la respuesta sea válida antes de mostrar el mensaje
        if (response && response.productId) {
          console.log("Producto editado:", response)
        } else {
          // Si la respuesta no contiene un productId, mostrar un mensaje de error
          this.alertService.showError('No se pudo editar el producto. Inténtalo de nuevo.');
        }
      }),
      catchError((error) => {
        console.error('Error al editar el producto:',error);
        this.alertService.showError('Algo salió mal al editar el producto.');
        return of(null);
      })
    );
  }
  
  getSearchProduct(name: string, city: string): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('city', city);
    
    return this.http.get<any>(`${this.apiUrl}public/search`, { params });
  }
  


  getProductById(productId: number): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
  
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        console.log("idproduct", productId);
  
        // Realizar la llamada HTTP correctamente dentro del switchMap
        return this.http.get(`${this.apiUrl}public/products-id`, {
          headers,
          params: { id: productId.toString() }
        });
      })
    );
  }
  




  
}
