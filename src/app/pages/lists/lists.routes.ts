import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './lists.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
