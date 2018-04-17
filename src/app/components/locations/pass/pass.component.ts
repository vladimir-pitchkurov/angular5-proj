import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {

  activeLocationId: any;
  locationInf: any;
  one_hour: any;
  two_hours: any;
  a6_under: any;
  locationHours: any;

  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , public service: LocationService ) {  }

  ngOnInit() {
    this.titleService.setTitle('Buy a Pass');
    this.meta.addTag({ name: 'meta-description', content: 'Pass description' });

    this.activatedRoute.params.forEach((params: Params) => {

      let id = params['id'];
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;

      if (this.service.getIdByName(this.activeLocationId)) {

        if (!this.service.locationHours[this.activeLocationId]) {
          this.service
            .getLocationHours(id)
            .then(result => {
              this.locationHours = result;
              this.service.setLocationHours(this.locationHours);
            }).catch();
        }

        if (!this.service.contactInfoOfFooter[this.activeLocationId]) {
          this.service
            .getLocationById(id)
            .then(result => {
              this.locationInf = result;
            }).catch();
        }
      }

    });
  }

}
