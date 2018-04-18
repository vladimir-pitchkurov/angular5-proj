import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from '../../services/init-js.service';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';

@Component({
  selector: 'app-escape-room',
  templateUrl: './escape-room.component.html',
  styleUrls: ['./escape-room.component.css']
})
export class EscapeRoomComponent implements OnInit, AfterViewInit {

  isDisplayed: any;

  activatedRoute: string;

    activeLocationId: any;
    currentCity: any = {};
    allLocationListener: any;

    constructor(private meta: Meta, private titleService: Title, private locationService: LocationService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.titleService.setTitle('Escape-room');
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
        this.activatedRoute = this.route.snapshot.paramMap.get('id');
        this.isDisplayed = this.setIsDisplayed();

            let currLocId = this.activatedRoute;

            if(this.locationService.LIST_OF_LOCATIONS.length)
            {
                this.loadFeatures(currLocId);
            }
            else {
                this.listenToAllLocationsLoaded(currLocId);
            }

    }

    listenToAllLocationsLoaded(currLocId)
    {
        this.allLocationListener = this.locationService.allLocationListEmitter.subscribe(data => {
            this.loadFeatures(currLocId);
        })
    }

    loadFeatures(id: any)
    {
        this.locationService.loadFeatures(id)
            .then(data => {

                this.currentCity = JSON.parse(localStorage.getItem('all-locations')).find(city => city.slug == id);

            })
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
