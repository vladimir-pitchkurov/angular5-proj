import {Component, Input, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    isLeftVisible = 0;
    service: LocationService;
    locationHours: any[];
    activeLocationId: any;
    locationInf: any[];


    constructor(private meta: Meta
                , private titleService: Title
                , private service: LocationService) {
    }

    ngOnInit() {
        this.activeLocationId = this.service.getActiveLocationId();
        this.titleService.setTitle('Home title');
        this.meta.addTag({ name: 'meta-description', content: 'description' });

        this.service.getLocationHours(this.activeLocationId)
          .then((data: any[]) => {
            this.locationHours = data;
          });

      this.service.getLocationById(this.activeLocationId)
        .then((data: any[]) => {
          this.locationInf = data;
        });

    }

}
