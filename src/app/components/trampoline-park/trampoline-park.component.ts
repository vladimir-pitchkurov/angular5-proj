import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-trampoline-park',
  templateUrl: './trampoline-park.component.html',
  styleUrls: ['./trampoline-park.component.css']
})
export class TrampolineParkComponent implements OnInit, AfterViewInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Trampoline Park');
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
    }

  ngAfterViewInit()
  {
    InitJsService.initBlockOne();
    // InitJsService.initLoc();
    InitJsService.initRules();
  }

}
