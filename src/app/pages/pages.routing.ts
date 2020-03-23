import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { MonitoringIndicatorsComponent } from './monitoringIndicators/monitoringIndicators.component';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  { path: 'mainPage', component: MonitoringIndicatorsComponent },
  //  { path: 'secondPage', component: SecondPageComponent },

  {
    path: '',
    redirectTo: '/mainPage',
    pathMatch: 'full'
  },
  { path: '**', component: MonitoringIndicatorsComponent }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
