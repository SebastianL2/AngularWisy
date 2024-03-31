import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { MasterService } from '../service/master.service';
Chart.register(...registerables);

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})

export class Forecast2Component implements OnInit {
constructor(private service:MasterService){}

  data:any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
 ngOnInit(): void {

   this.fetchPosts();
 }
 fetchPosts(){
  
  this.service.Getchartinfo().subscribe((data:any)=>{
    this.service.Getchartinfo().subscribe(
      (data: any) => {
        console.log(data);
        this.processData(data);
        this.RenderChart(); 
      },
      (error) => {
        console.error('Error fetching data:', error);
        
      }
    );
  })
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
