import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { MasterService } from '../service/master.service';
import { TablecastComponent } from '../tablecast2/tablecast.component';

Chart.register(...registerables);

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [TablecastComponent],
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
  
  this.service.Getchartinfo2().subscribe((data:any)=>{
    this.service.Getchartinfo2().subscribe(
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
      label: 'temperatures in LWX',
      data: temperatures,
      fill: false,
      borderColor: 'rgb(253, 253, 253)',
      tension: 0.1
    }]
  };
  const precipitationData = this.data.properties.periods.map((period: any) => period.probabilityOfPrecipitation.value);
  function classifyPrecipitation(data: number[]) {
    let lessThan50: number[] = [];
    let greaterThan50: number[] = [];
    let greaterThan80: number[] = [];
  
    data.forEach(probability => {
      if (probability < 50) {
        lessThan50.push(probability);
      } else if (probability >= 50 && probability < 80) {
        greaterThan50.push(probability);
      } else if (probability >= 80) {
        greaterThan80.push(probability);
      }
    });
  
    return {
      "Less than 50%": lessThan50.length,
      "Greater than 50% and less than 80%": greaterThan50.length,
      "Greater than 80%": greaterThan80.length
    };
  }
  const classifiedPrecipitation = classifyPrecipitation(precipitationData);
  const data2 = {
    labels: ["Less than 50%", "Greater than 50% and less than 80%", "Greater than 80%"],
    datasets: [{
      label: 'Number of days with probability of precipitation',
      data: [
        classifiedPrecipitation["Less than 50%"],
        classifiedPrecipitation["Greater than 50% and less than 80%"],
        classifiedPrecipitation["Greater than 80%"]
        
      ],
      backgroundColor: [
        'white',
        'rgb(54, 162, 235)',
        'gray'
      ],
      hoverOffset: 4
    }]
  };
  const myChart = new Chart("line", {
    type: 'line',
    data: data,
  });

  const myChart2 = new Chart("doughnut", {
    type: 'doughnut',
    data: data2,
  });
 }
}
