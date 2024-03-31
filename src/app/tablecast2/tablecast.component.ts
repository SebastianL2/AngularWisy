import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Chart, registerables} from 'chart.js';
import { MasterService } from '../service/master.service';
Chart.register(...registerables)

export interface PeriodicElement {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  temperature: number;
}

@Component({
  selector: 'app-tablecast',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './tablecast.component.html',
  styleUrl: './tablecast.component.css'
})

export class TablecastComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['number','name','date', 'startTime', 'endTime','temperature'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  data:any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private service:MasterService){}

  ngOnInit(): void {

    this.fetchPosts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchPosts(){
    this.service.Getchartinfo2().subscribe((data: any) => {
      this.dataSource.data = data.properties.periods;
    });
   }

   processData(data: any): void {

    const periods = data?.properties?.periods; 
    
    if (periods) {
      const labels = periods.map((period: any) => {
        const date = new Date(period.startTime);
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]; 
  
     
        if (!period.name.includes('Night')) {
          return `${dayOfWeek}, ${period.name.substring(0, 3)}`; 
        } else {
          return period.name; 
        }
      });
  
    
      this.labeldata = labels;
      this.data = data; 
    } else {
      console.error('No se encontraron periodos en los datos:', data);
      
    }
  }
  formatTime(timeString: string): string {
   
    const date = new Date(timeString);


    const hours = date.getHours();
    const minutes = date.getMinutes();

   
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
  }
  formatTime2(timeString: string, isDayAndMonth: boolean = false): string {
    
    const date = new Date(timeString);

    const day = date.getDate();
    const month = date.getMonth() + 1; 

   
    const formattedTime = `${day}/${month}`;

    return formattedTime;
  }
   RenderChart(){
    
    const temperatures = this.data.properties.periods.map((period: { temperature: any; }) => period.temperature);
    const data = {
      labels: this.labeldata,
      datasets: [{
        label: 'temperatures in TOP',
        data: temperatures,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const myChart = new Chart("doughnut", {
      type: 'line',
      data: data,
    });
   }
}
