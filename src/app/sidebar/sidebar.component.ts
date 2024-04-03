import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule,CommonModule,MatSidenavModule,RouterOutlet,MatChipsModule,MatToolbarModule,MatIconModule,MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  showFiller: boolean = false; 
  selectedRoute: string = '/LWX'; 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );
  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {}
  onClick(rute: string)
  {
    this.selectedRoute = rute;

    // Navega a la ruta correspondiente utilizando Angular Router
    this.router.navigate([rute]);

  }
}
