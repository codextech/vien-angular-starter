import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TopnavComponent } from './topnav/topnav.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ColorSwitcherComponent } from './color-switcher/color-switcher.component';
import { CollapseModule, BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { HeadingComponent } from './heading/heading.component';
import { ApplicationMenuComponent } from './application-menu/application-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopnavComponent,
    SidebarComponent,
    BreadcrumbComponent,
    ColorSwitcherComponent,
    FooterComponent,
    HeadingComponent,
    ApplicationMenuComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    TranslateModule,
    RouterModule,
    CollapseModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports: [
    TopnavComponent,
    SidebarComponent,
    BreadcrumbComponent,
    ColorSwitcherComponent,
    FooterComponent,
    HeadingComponent,
    ApplicationMenuComponent
  ]
})
export class LayoutContainersModule { }
