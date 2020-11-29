import { NgModule } from '@angular/core';
import { SecondComponent } from './second/second.component';
import { SecondMenuComponent } from './second-menu.component';
import { SecondMenuRoutingModule } from './second-menu.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

@NgModule({
  declarations: [SecondMenuComponent, SecondComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    SecondMenuRoutingModule
  ]
})
export class SecondMenuModule { }
