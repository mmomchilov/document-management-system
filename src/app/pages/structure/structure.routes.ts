import { Routes, RouterModule } from '@angular/router';

import { Structure } from './structure.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Structure,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
