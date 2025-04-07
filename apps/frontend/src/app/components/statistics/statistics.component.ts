import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Statistics, RevenueDataPoint } from '../../models/statistics.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatSelectModule, 
    NgxChartsModule
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics: Statistics = {
    currentMonth: {
      revenue: 12349.59,
      orderCount: 835,
      averageTicket: 23.56
    },
    revenueAnalysis: [
      { month: 'Jan', revenue: 25000, orders: 350 },
      { month: 'Feb', revenue: 42000, orders: 420 },
      { month: 'Mar', revenue: 65000, orders: 550 },
      { month: 'Apr', revenue: 52000, orders: 230 },
      { month: 'May', revenue: 45000, orders: 250 },
      { month: 'Jun', revenue: 48000, orders: 580 },
      { month: 'Jul', revenue: 53000, orders: 640 },
      { month: 'Aug', revenue: 40000, orders: 580 },
      { month: 'Sep', revenue: 47000, orders: 520 },
      { month: 'Oct', revenue: 45000, orders: 280 },
      { month: 'Nov', revenue: 43000, orders: 260 },
      { month: 'Dec', revenue: 25000, orders: 320 }
    ]
  };

  // Chart options
  view: [number, number] = [800, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Revenue (€)';
  timeline = true;

  colorScheme: string = 'cool';

  // Get data for the chart
  get chartData() {
    return [
      {
        name: 'Revenue',
        series: this.statistics.revenueAnalysis.map(data => ({
          name: data.month,
          value: data.revenue
        }))
      },
      {
        name: 'Orders',
        series: this.statistics.revenueAnalysis.map(data => ({
          name: data.month,
          value: data.orders
        }))
      }
    ];
  }

  constructor() {}

  ngOnInit(): void {}
} 