import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            // { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '', component: AnalyticsComponent },
            // { path: 'category', loadChildren: () => import('../dashboard/category-management/category-management.module').then(m => m.CategoryManagementModule) },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
