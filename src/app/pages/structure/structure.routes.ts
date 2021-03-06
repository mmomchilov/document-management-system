import { Routes, RouterModule } from '@angular/router';

import { StructureComponent } from './structure.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
