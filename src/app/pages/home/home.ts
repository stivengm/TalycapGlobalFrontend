import { Component, OnInit, signal } from '@angular/core';
import { TheMovieDBService } from '../../core/services/themoviedb.service';
import { OpenWeatherService } from '../../core/services/openweather.service';
import { MovieModel } from '../../core/models/movie.model';
import { ResponseOpenWeatherModel } from '../../core/models/response_openWeather.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { GenreModel } from '../../core/models/genres.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatPaginatorModule,
    DatePipe,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {

  weatherInformation = signal<ResponseOpenWeatherModel | null>(null);
  popularMovies = signal<MovieModel[]>([]);
  genres = signal<GenreModel[]>([]);
  searchQuery = signal('');
  weatherSearchControl = new FormControl('');


  currentPage = signal(1);
  totalMovies = signal(0);
  pageSize = signal(20);

  constructor(
    private openWeather: OpenWeatherService,
    private theMovieDBService: TheMovieDBService,
    private snackBar: MatSnackBar
  ) {}

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  ngOnInit(): void {
    this.getPopularMovies()
    this.getWeather();
    this.getGenres();
  }

  getWeather(city: string = 'Bogota'): void {
    const searchCity = city.trim();

    if (!searchCity) {
      return;
    }

    this.openWeather.getWeather(searchCity).subscribe({
      next: (response) => {
        this.weatherInformation.set(response);
      },
      error: (error) => {
        console.error('Error obteniendo clima:', error);

        if (error.status === 404) {
          this.showError('No se encontró la ciudad.');
        } else {
          this.showError('Error al consultar el clima.');
        }
      }
    });
  }

  searchWeather(): void {
    const city = this.weatherSearchControl.value?.trim() ?? '';

    if (!city) {
      return;
    }

    this.getWeather(city);
  }

  getPopularMovies(page: number = 1) {
    this.theMovieDBService.getPopularMovies(page).subscribe({
      next: (response) => {
        this.popularMovies.set(response.results);
        this.totalMovies.set(response.total_results);
      },
      error: (error) => {
        console.error('Error obteniendo películas:', error);
        this.showError('No se pudieron cargar las películas.');
      }
    });
  }

  searchMovies(query: string): void {
    query = query.trim();

    if (!query) {
      this.getPopularMovies(1);
      return;
    }

    this.searchQuery.set(query);

    this.theMovieDBService.searchMovies(query, 1).subscribe({
      next: (response) => {
        this.popularMovies.set(response.results);
        this.totalMovies.set(response.total_results);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getGenres(): void {
    this.theMovieDBService.getMovieGenres().subscribe({
      next: (response) => {
        this.genres.set(response.genres);
      },
      error: (error) => {
        console.error('Error obteniendo géneros:', error);
        this.showError('No se pudieron cargar los géneros.');
      }
    });
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    this.pageSize.set(event.pageSize);

    if (this.searchQuery()) {
      this.theMovieDBService
        .searchMovies(this.searchQuery(), page)
        .subscribe({
          next: (response) => {
            this.popularMovies.set(response.results);
            this.totalMovies.set(response.total_results);

          },

          error: (error) => {
            console.error(error);
          }
        });

    } else {

      this.getPopularMovies(page);

    }
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds
      .map(id => this.genres().find(genre => genre.id === id)?.name)
      .filter((name): name is string => !!name);

  }

  formatterDescriptionWeather(description: string): string {
    if (!description) {
      return "";
    }

    return description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
  }

}
