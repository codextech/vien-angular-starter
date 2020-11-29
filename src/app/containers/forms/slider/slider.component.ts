import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LangService } from 'src/app/shared/lang.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {
  sliderValue = 10;
  sliderRangeFormGroup: FormGroup;
  _sliderConfig;

  constructor(private langService: LangService) {
    this._sliderConfig = { direction: this.langService.direction };
  }

  get sliderConfig() {
    return {...this._sliderConfig};
  }

  ngOnInit() {
    this.sliderRangeFormGroup = new FormGroup({
      range: new FormControl([800, 1200]),
    });
    console.log(this.sliderRangeFormGroup.controls.range);
  }

}
