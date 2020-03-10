import { Routes, RouterModule } from '@angular/router';

import { MonitoringIndicatorsComponent } from './monitoringIndicators.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MonitoringIndicatorsComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
