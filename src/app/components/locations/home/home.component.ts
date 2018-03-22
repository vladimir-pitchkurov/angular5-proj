import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isLeftVisible = 0;

    locations:any[];
    linksByField: any;

    constructor(private meta: Meta, private titleService: Title/* for local testings, private locationService: LocationService*/) {
    }

    ngOnInit() {
        this.titleService.setTitle('Home title');
        this.meta.addTag({ name: 'meta-description', content: 'description' });

      /* for local service testing methods

      this.locationService.getLocations()
        .then((data: any[]) => {
          this.locations = data;
          console.log('this.locations', this.locations);
        })

      this.locationService.getLocationLinksByField(13, 'facebook')
        .then((data: any[]) => {
          this.linksByField = data;
          console.log('linksByField', this.linksByField)
        })*/
    }

}
