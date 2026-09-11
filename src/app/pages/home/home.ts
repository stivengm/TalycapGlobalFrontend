import { Component, OnInit, signal } from '@angular/core';
import { TheMovieDBService } from '../../core/services/themoviedb.service';
import { OpenWeatherService } from '../../core/services/openweather.service';
import { MovieModel } from '../../core/models/movie.model';
import { ResponseOpenWeatherModel } from '../../core/models/response_openWeather.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { GenreModel } from '../../core/models/genres.model';

@Component({
  selector: 'app-home',
  imports: [
    MatPaginatorModule,
    MatChipsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {

  weatherInformation = signal<ResponseOpenWeatherModel | null>(null);
  popularMovies = signal<MovieModel[]>([]);
  genres = signal<GenreModel[]>([]);


  currentPage = signal(1);
  totalMovies = signal(0);
  pageSize = signal(20);

  constructor(
    private openWeather: OpenWeatherService,
    private theMovieDBService: TheMovieDBService
  ) {}

  ngOnInit(): void {
    this.getPopularMovies()
    this.getWeather();
    this.getGenres();
  }

  getWeather() {
    const city = "Bogota";
    this.openWeather.getWeather(city).subscribe({
      next: (response) => {
        this.weatherInformation.set(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getPopularMovies(page: number = 1) {
    this.theMovieDBService.getPopularMovies(page).subscribe({
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
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getPopularMovies(event.pageIndex + 1);
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
