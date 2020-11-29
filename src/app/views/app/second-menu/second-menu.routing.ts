import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondMenuComponent } from './second-menu.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
    {
        path: '', component: SecondMenuComponent,
        children: [
            { path: '', redirectTo: 'second', pathMatch: 'full' },
            { path: 'second', component: SecondComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecondMenuRoutingModule { }
