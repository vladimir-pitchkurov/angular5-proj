import { Component, OnInit } from '@angular/core';
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
        ])
    ]
})
export class MainSliderComponent implements OnInit {
    @Input () activePane: PaneType = 'trampoline';
    constructor() { }

    ngOnInit() {
    }

}
