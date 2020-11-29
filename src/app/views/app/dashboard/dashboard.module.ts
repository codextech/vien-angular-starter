import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  imports: [
    SharedModule,
    LayoutContainersModule,
    DashboardsContainersModule,
    DashboardRoutingModule,
    ComponentsCardsModule,
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    AnalyticsComponent
  ]
})
export class DashboardModule { }
