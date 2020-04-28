import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AllClassSeriesComponent} from './all-class-series/all-class-series.component';
import {ClassSeriesComponent} from './class-series.component';

const routes: Routes = [{
  path: '',
  component: ClassSeriesComponent,
  children: [
    {
      path: 'view-all',
      component: AllClassSeriesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassSeriesRoutingModule {
}
