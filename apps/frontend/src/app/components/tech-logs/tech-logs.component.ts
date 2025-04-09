import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

interface MicroserviceStatus {
  id: number;
  serviceName: string;
  cpuPerformance: string;
  status: 'Actif' | 'Inactif';
}

interface Log {
  id: number;
  dateTime: string;
  name: string;
}

@Component({
  selector: 'app-tech-logs',
  templateUrl: './tech-logs.component.html',
  styleUrls: ['./tech-logs.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule]
})
export class TechLogsComponent implements OnInit {
  microservicesColumns: string[] = ['id', 'serviceName', 'cpuPerformance', 'status'];
  logsColumns: string[] = ['id', 'dateTime', 'name'];

  microservices: MicroserviceStatus[] = [
    { id: 1, serviceName: 'Auth', cpuPerformance: '0.2%', status: 'Actif' },
    { id: 2, serviceName: 'User', cpuPerformance: '0%', status: 'Inactif' },
    { id: 3, serviceName: 'Order', cpuPerformance: '0.2%', status: 'Actif' },
    { id: 4, serviceName: 'Product', cpuPerformance: '0%', status: 'Inactif' },
    { id: 5, serviceName: 'Log', cpuPerformance: '0.2%', status: 'Actif' }
  ];

  connectionLogs: Log[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    dateTime: '19/03/2025 15:05:13',
    name: 'Jhon Doe'
  }));

  downloadLogs: Log[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 6,
    dateTime: '19/03/2025 15:05:13',
    name: 'Jhon Doe'
  }));

  constructor() {}

  ngOnInit(): void {}
} 