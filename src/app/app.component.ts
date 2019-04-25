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
  ngOnInit() {
    this.IsntanceNoChart = new Chart(this.isntanceNoChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['--', '--', '--', '--', '--'],
        datasets: [{
          data: [7, 4, 9, 6, 8],
          borderColor: ['#ff5722', '#3f51b5', '#2196f3', '#ff9800', '#16a085', '#00bcd4'],
          backgroundColor: ['#ff5722', '#3f51b5', '#2196f3', '#ff9800', '#16a085', '#00bcd4'],
          fill: false,
          label: 'Instance Count'
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12,
            padding: 8
          }
        },
        scales: {
          yAxes: [{
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: '# Executions',
              fontFamily: 'Montserrat'
            },
          }]
        }
      }
    });
    setInterval(() => {
      const date = new Date();
      this.addData(this.IsntanceNoChart, date.toISOString().split('T')[1].split('.')[0], (Math.random() * 10) / 1);
      this.removeData(this.IsntanceNoChart);
    }, 5000);
  }
  addData(chart: Chart, label: string, data: number) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }
  removeData(chart: Chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
    chart.update();
  }
}
