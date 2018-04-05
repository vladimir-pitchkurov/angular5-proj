import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';
import {LocationService} from '../../services/location.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit, AfterViewInit, DoCheck {

  isLeftVisible = 0;
  boolChanged = false;
  locArr;


  constructor(  private meta: Meta
              , private titleService: Title
              , private service: LocationService
              , private router: Router  ) {
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

    this.router.events.subscribe((evt) => {

      /*if(this.service.LIST_OF_LOCATIONS.length == 0){
        this.service.getAllLocations()
          .then((data: any[]) => {
            this.locations = data;
            this.service.LIST_OF_LOCATIONS = this.locations;
          });
      }else {
        this.locations = this.service.LIST_OF_LOCATIONS;
      }

      if(this.service.LIST_OF_LOCATIONS.length == 0 && this.locations.length > 0){
        this.service.setMapOfLoc(this.locations);
      }*/
    });

    console.log('in home init: ', this.service.LIST_OF_LOCATIONS);


  }

  ngAfterViewInit() {
    InitJsService.initScroll();
    InitJsService.initBlockOne();
    InitJsService.initLoc();
    console.log('in home after view init: ', this.service.LIST_OF_LOCATIONS);

  }

  ngDoCheck(){
    /*if (this.service.LIST_OF_LOCATIONS){
      if (this.service.LIST_OF_LOCATIONS.length > 0){
        if(this.service.contactInfoOfFooter){
          console.log('check in home', this.service.contactInfoOfFooter);
            this.locArr = this.service.contactInfoOfFooter;
        }
      }
    }*/
  }

}
