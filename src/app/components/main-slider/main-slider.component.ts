import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
type PaneType = 'trampoline' | 'escape' | 'virtual';
@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('trampoline', style({ transform: 'translateX(0)' })),
      state('escape', style({ transform: 'translateX(-33.33%)' })),
      state('virtual', style({ transform: 'translateX(-66.66%)' })),
      transition('* => *', animate(300))
    ])]
})
export class MainSliderComponent implements OnInit, AfterViewInit {
  @Input () activePane: PaneType = 'trampoline';

  _availableSlides: any;

  @Input('availableSlides') set availableSlides (el) {
    this._availableSlides = el;
    console.log('this._availableSlides',this._availableSlides)
  };

  get availableSlides() {
    return this._availableSlides;
  }

  constructor() {
  }

  ngOnInit() {

  }


  ngAfterViewInit() {

  }

}
