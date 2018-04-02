import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-trampoline-parties',
  templateUrl: './trampoline-parties.component.html',
  styleUrls: ['./trampoline-parties.component.css']
})
export class TrampolinePartiesComponent implements OnInit, AfterViewInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Trampoline-parties');
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
    }

  ngAfterViewInit()
  {
    InitJsService.initBlockOne();
    InitJsService.initRules();
  }

}
