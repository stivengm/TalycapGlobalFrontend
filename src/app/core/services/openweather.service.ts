import { Injectable } from '@angular/core';
import { HttpAppService } from './http.service';
import { environment } from '../../../environments/environment';
import { ResponseOpenWeatherModel } from '../models/response_openWeather.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

    constructor(
        private httpApp: HttpAppService
    ) {}

    getWeather(city: string) {
        const params = new HttpParams()
            .set('q', city)
            .set('appid', environment.apiKeyOpenWeather)
            .set('units', 'metric')
            .set('lang', 'es');

        return this.httpApp.get<ResponseOpenWeatherModel>(`${environment.apiOpenWeather}`, { params });
    }

}