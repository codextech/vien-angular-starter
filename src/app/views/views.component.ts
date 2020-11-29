import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html'
})
export class ViewsComponent implements OnInit {

  constructor(private router: Router) {
    // If you have landing page, remove below line and implement it here.
    this.router.navigateByUrl('/app');
  }

  ngOnInit() {

  }

}
