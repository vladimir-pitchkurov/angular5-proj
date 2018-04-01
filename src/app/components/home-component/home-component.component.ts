import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit, AfterViewInit {

  isLeftVisible = 0;
  boolChanged = false;

  constructor(private meta: Meta, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Main');
    this.meta.addTag({name: 'meta-keywords', content: 'Home keywords'});
    this.meta.addTag({name: 'meta-description', content: 'Home description'});

    setInterval(() => {
      if (!this.boolChanged) {
        this.isLeftVisible++;
        if (this.isLeftVisible == 3) {
          this.isLeftVisible = 0;
        }
      }
    }, 3000);
  }

  ngAfterViewInit() {
    InitJsService.initScroll();
    InitJsService.initBlockOne();
    //InitJsService.initLoc();
  }

}
