import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-escape-room',
  templateUrl: './escape-room.component.html',
  styleUrls: ['./escape-room.component.css']
})
export class EscapeRoomComponent implements OnInit, AfterViewInit {

  isDisplayed: any;

  activatedRoute: string;

    constructor(private meta: Meta, private titleService: Title, private locationService: LocationService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.titleService.setTitle('Escape-room');
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
        this.activatedRoute = this.route.snapshot.paramMap.get('id');
        this.isDisplayed = this.setIsDisplayed();
    }

    setIsDisplayed() :any {

      return (this.activatedRoute);
    }


  ngAfterViewInit()
  {
    InitJsService.initCarousel();
    InitJsService.initLoc();
    InitJsService.initRules();
  }

}
