import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-binned-percentage-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class BinnedPercentageChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight, colors.successLight, colors.warningLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Previous Method', 'Outlier Handler', 'Unbinned'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Binned percentage',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['60%', '30%'],
            data: [
              { value: 335, name: 'Previous Method' },
              { value: 310, name: 'Outlier Handler' },
              { value: 234, name: 'Unbinned' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
