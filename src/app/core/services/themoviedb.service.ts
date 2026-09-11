import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpAppService } from './http.service';
import { MovieModel } from '../models/movie.model';
import { environment } from '../../../environments/environment';
import { ResponseTheMovieDBModel } from '../models/response_theMovieDB.model';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDBService {

    constructor(
        private httpApp: HttpAppService
    ) {}

    getPopularMovies() {
        return this.httpApp.get<ResponseTheMovieDBModel<MovieModel[]>>(
            `${environment.apiTheMovieDB}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
            {
                headers: {
                Authorization: `Bearer ${environment.apiKeyTheMovieDB}`,
                accept: 'application/json'
                }
            }
        );
    }

}