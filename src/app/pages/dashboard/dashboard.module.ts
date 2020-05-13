import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule, NbInputModule, NbCheckboxModule, NbActionsModule, NbDialogModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NoOfBinnedContigsChartComponent } from './no-of-binned-contigs-chart/no-of-binned-contigs-chart.component';
import { BinnedPercentageChartComponent } from './binned-percentage-chart/binned-percentage-chart.component';
import {FormsModule} from '@angular/forms';
import { FileStructureViewerComponent } from './file-structure-viewer/file-structure-viewer.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    NbActionsModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    DashboardComponent,
    NoOfBinnedContigsChartComponent,
    BinnedPercentageChartComponent,
    FileStructureViewerComponent,
  ],
  entryComponents: [
    FileStructureViewerComponent,
  ],
})
export class DashboardModule { }
