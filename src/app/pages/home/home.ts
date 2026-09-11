import { Component, OnInit, signal } from '@angular/core';
import { TheMovieDBService } from '../../core/services/themoviedb.service';
import { OpenWeatherService } from '../../core/services/openweather.service';
import { MovieModel } from '../../core/models/movie.model';
import { ResponseOpenWeatherModel } from '../../core/models/response_openWeather.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {

  weatherInformation = signal<ResponseOpenWeatherModel | null>(null);
  popularMovies = signal<MovieModel[]>([]);

  constructor(
    private openWeather: OpenWeatherService,
    private theMovieDBService: TheMovieDBService
  ) {}

  ngOnInit(): void {
    this.getPopularMovies()
    this.getWeather();
  }

  getWeather() {
    const city = "Bogota";
    this.openWeather.getWeather(city).subscribe({
      next: (response) => {
        console.log(response);
        this.weatherInformation.set(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getPopularMovies() {
    this.theMovieDBService.getPopularMovies().subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.results);

        this.popularMovies.set(response.results);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  formatterDescriptionWeather(description: string): string {
    if (!description) {
      return "";
    }

    return description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
  }

}
