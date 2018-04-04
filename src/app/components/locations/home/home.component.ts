import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {


  isLeftVisible = 0;
  boolChanged = false;

  locationHours: any;
  activeLocationId: any;
  locationInf: any;


  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) {
  }


  ngOnInit() {

    setInterval(() => {
      if (!this.boolChanged) {
        this.isLeftVisible++;
        if (this.isLeftVisible == 3) {
          this.isLeftVisible = 0;
        }
      }
    }, 3000);

    this.titleService.setTitle('Home title');
    this.meta.addTag({name: 'meta-description', content: 'description'});

    this.activatedRoute.params.forEach((params: Params) => {


      let id = params["id"];
      this.activeLocationId = id;

      this.service.activeLocationId = this.activeLocationId;

      if (!this.service.locationHours[this.activeLocationId]) {

        if(!isNullOrUndefined(this.activeLocationId) ) {
           this.service
            .getLocationHours(id)
            .then(result => this.locationHours = result);
          this.service.setLocationHours( this.locationHours );
        }

      }

      if (!this.service.contactInfoOfFooter[this.activeLocationId]) {
        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);
      }

    });

  }


  ngDoCheck() {
    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    } else {
      if (!this.service.locationHours[this.activeLocationId] && !this.locationHours) {
        this.service
          .getLocationHours(this.activeLocationId)
          .then(result => this.locationHours = result);
      }
      if (!this.service.locationHours[this.activeLocationId] && this.locationHours) {
        if(this.locationHours.length > 0){
           this.service.setLocationHours( this.locationHours );
        }
      }
    }
  }

}
