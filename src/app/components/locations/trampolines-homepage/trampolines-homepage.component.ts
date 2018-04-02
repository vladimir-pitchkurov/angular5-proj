import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-trampolines-homepage',
  templateUrl: './trampolines-homepage.component.html',
  styleUrls: ['./trampolines-homepage.component.css']
})
export class TrampolinesHomepageComponent implements OnInit {

  locationHours: any;
  locationInf: any;
  activeLocationId: any;


    constructor( private route: Router
               , private activatedRoute: ActivatedRoute
               , private meta: Meta
               , private titleService: Title
               , private service: LocationService) { }

    ngOnInit() {
        this.titleService.setTitle('GrTrampolines Homepageoups');
        this.meta.addTag({ name: 'meta-description', content: 'Trampolines Homepage description' });

      this.activatedRoute.params.forEach((params: Params) => {

        let id = params["id"];
        this.activeLocationId = id;

        this.service.activeLocationId = this.activeLocationId;

        this.service
          .getLocationHours(id)
          .then(result => this.locationHours = result);

        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);

      });


    }

}
