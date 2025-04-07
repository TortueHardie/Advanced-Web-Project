import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Statistics, RevenueDataPoint } from '../../models/statistics.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxChartsModule
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {
  isLoading = true;
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
      { month: 'Jun', revenue: 48000, orders: 580 }
    ]
  };

  // Chart options
  view: [number, number] = [600, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Revenue (€)';
  timeline = false;

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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 100);
  }

  onSelect(event: any) {
    // Handle selection events
  }
} 