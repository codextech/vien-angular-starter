import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;

  loadingRouteConfig : boolean;
  constructor(private langService: LangService,
    private router: Router,
    private renderer: Renderer2) {

  }

  ngOnInit() {
    this.langService.init();

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
          this.loadingRouteConfig = true;

      } else if (event instanceof RouteConfigLoadEnd) {
          this.loadingRouteConfig = false;

      }
  });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }
}
