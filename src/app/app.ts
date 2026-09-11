import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'TalycapGlobalFrontend';
}
