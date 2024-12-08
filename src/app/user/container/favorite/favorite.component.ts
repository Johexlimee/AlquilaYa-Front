import { Component } from '@angular/core';
import { FavoriteService } from '../../../service/favorite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  favorites:any;
  constructor( private favoriteService: FavoriteService,private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAllProductsUser();
   
  }

  getAllProductsUser(): void {
    this.favoriteService.getUserFavorites().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.favorites = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }
}
