import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, DoCheck {

  activeLocationId: any;
  locationInf: any;

    constructor(private route: Router
      , private activatedRoute: ActivatedRoute
      , private meta: Meta
      , private titleService: Title
      , private service: LocationService) { }

    ngOnInit() {
        this.titleService.setTitle('Gallery');
        this.meta.addTag({ name: 'meta-description', content: 'Gallery description' });
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
