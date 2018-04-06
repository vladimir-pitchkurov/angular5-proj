import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-escape-room',
  templateUrl: './escape-room.component.html',
  styleUrls: ['./escape-room.component.css']
})
export class EscapeRoomComponent implements OnInit, AfterViewInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Escape-room');
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
    }


  ngAfterViewInit()
  {
    InitJsService.initCarousel();
    InitJsService.initLoc();
    InitJsService.initRules();
  }

}
