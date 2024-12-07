import { CanActivateFn, Router } from '@angular/router';
import { AuthcontrollerService } from './service/authcontroller.service';
import { switchMap } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthcontrollerService);
  const router = inject(Router);

  return authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        router.navigate(['/']); // Redirige a la página de inicio si no hay token
        return [false];
      }

      try {
        // Decodificar el JWT manualmente (sin librerías externas)
        const base64Url = token.split('.')[1]; // Extraemos el payload del token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplazamos los caracteres del Base64
        const decodedPayload = JSON.parse(atob(base64)); // Decodificamos y parseamos el payload

        const role = decodedPayload?.role;
        console.log('Rol del usuario:', role);

        // Obtener el path de la ruta actual
        const currentRoutePath = route.routeConfig?.path;

        // Validar el acceso según el rol
        if (currentRoutePath === 'admin' && role !== 'ADMIN') {
          // Si la ruta es /admin y el rol no es ADMIN, redirige al inicio o página de error
          router.navigate(['/user']);
          return [false];
        }

        if (role === 'ADMIN' || role === 'CUSTOMER') {
          return [true];
        } else {
          router.navigate(['/']); // Redirige si el rol no es válido
          return [false];
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        router.navigate(['/']); // Redirige si hay un error al decodificar el token
        return [false];
      }
    })
  );
};
