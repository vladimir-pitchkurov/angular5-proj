import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, DoCheck {

  activeLocationId: any;
  locationInf: any;

    constructor(private route: Router
      , private activatedRoute: ActivatedRoute
      , private meta: Meta
      , private titleService: Title
      , private service: LocationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Activities');
        this.meta.addTag({ name: 'meta-description', content: 'Activities description' });

      this.activatedRoute.params.forEach((params: Params) => {

        let id = params["id"];

        this.activeLocationId = id;

        this.service.activeLocationId = this.activeLocationId;

        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);

      });
    }

    ngDoCheck() {

      if ( this.activeLocationId !== this.service.activeLocationId ) {
        this.service.activeLocationId = this.activeLocationId;
      }
    }
}
