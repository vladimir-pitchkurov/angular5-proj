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
export class HomeComponent implements OnInit {

  isLeftVisible = 0;
  boolChanged = false;
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

      if (!this.service.contactInfoOfFooter[this.activeLocationId]) {
        if (this.service.getIdByName(this.activeLocationId)) {

          this.service
            .getLocationById(id)
            .then((result) => {
              this.locationInf = result;
              this.service.setLocationInformation(this.locationInf);
            });
        }
      }
    });
  }
}
