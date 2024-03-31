import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { Forecast2Component } from './forecast2/forecast.component';

export const routes: Routes = [
    {path:'home',component:AppComponent},
    {path:'LWX',component:ForecastComponent},
    {path:'TOP',component:Forecast2Component}
];
