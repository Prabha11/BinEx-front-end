import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClassSeriesRoutingModule} from './class-series-routing.module';
import {AllClassSeriesComponent} from './all-class-series/all-class-series.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {ClassSeriesComponent} from './class-series.component';
import {CommonComponentModule} from "../common-component/common-component.module";

@NgModule({
  declarations: [
    ClassSeriesComponent,
    AllClassSeriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClassSeriesRoutingModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    FormsModule,
    NbInputModule,
    NbSpinnerModule,
    NbAccordionModule,
    NbDatepickerModule,
    CommonComponentModule,
  ],
})
export class ClassSeriesModule { }
