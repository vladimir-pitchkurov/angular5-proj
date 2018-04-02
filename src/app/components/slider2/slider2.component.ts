import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


type PaneType = 'trampoline' | 'escape' | 'virtual';

@Component({
  selector: 'app-slider2',
  templateUrl: './slider2.component.html',
  styleUrls: ['./slider2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('trampoline', style({ transform: 'translateX(0)' })),
      state('escape', style({ transform: 'translateX(-33.33%)' })),
      state('virtual', style({ transform: 'translateX(-66.66%)' })),
      transition( '* => *', animate(300))
    ])]
})
export class Slider2Component implements OnInit {

  @Input () activePane: PaneType = 'trampoline';

  constructor() { }

  ngOnInit() {
  }

}
