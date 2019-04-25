import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('isntanceNoChart') isntanceNoChart: ElementRef;
  IsntanceNoChart: Chart;
  sensorList = [
    'Sensor1',
    'Sensor2',
    'Sensor3',
    'Sensor4',
    'Sensor5',
  ];
  selectedSensor = this.sensorList[0];
  ngOnInit() {
    this.drawChart();
    setInterval(() => {
      this.addData(this.IsntanceNoChart, Math.floor(Math.random() * 20) + 15);
      this.removeData(this.IsntanceNoChart);
    }, 10000);
  }
  drawChart() {
    const data = [];
    for (let i = 0; i < 360; i++) { data.push(Math.floor(Math.random() * 20) + 15); }
    this.IsntanceNoChart = new Chart(this.isntanceNoChart.nativeElement, {
      type: 'line',
      data: {
        labels: data.map(() => ''),
        datasets: [{
          data,
          borderColor: '#F57C00',
          backgroundColor: '#F57C00',
          borderWidth: 1,
          fill: false,
          lineTension: 0,
          pointRadius: 0
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Temperature (Celsius)',
              fontFamily: 'Montserrat'
            },
            ticks: {
              min: 15,
              max: 35,
              stepSize: 5
            }
          }]
        },
        tooltips: {
          intersect: false
        }
      }
    });
  }
  addData(chart: Chart, data: number) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }
  removeData(chart: Chart) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
    chart.update();
  }
  changeSensor(sensor: string) {
    this.selectedSensor = sensor;
    this.IsntanceNoChart.destroy();
    this.drawChart();
  }
}
