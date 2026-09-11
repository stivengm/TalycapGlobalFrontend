import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpAppService } from './http.service';
import { MovieModel } from '../models/movie.model';
import { environment } from '../../../environments/environment';
import { ResponseTheMovieDBModel } from '../models/response_theMovieDB.model';
import { GenresModel } from '../models/genres.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDBService {

    constructor(
        private httpApp: HttpAppService
    ) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders()
        .set(
            'Authorization',
            `Bearer ${environment.apiKeyTheMovieDB}`
        )
        .set(
            'accept',
            'application/json'
        );
    }

    getPopularMovies(page: number = 1) {
        const params = new HttpParams()
            .set('include_adult', 'false')
            .set('include_video', 'false')
            .set('language', 'es-ES')
            .set('page', page)
            .set('sort_by', 'popularity.desc');

        return this.httpApp.get<ResponseTheMovieDBModel<MovieModel[]>>(
        `${environment.apiTheMovieDB}/discover/movie`,
        {
            params,
            headers: this.getHeaders()
        }
        );
    }

    getMovieGenres() {
        const params = new HttpParams()
            .set('language', 'es-ES');

        return this.httpApp.get<GenresModel>(
        `${environment.apiTheMovieDB}/genre/movie/list`,
        {
            params,
            headers: this.getHeaders()
        }
        );
    }

}