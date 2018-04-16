import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../../services/location.service';
import {InitJsService} from '../../../services/init-js.service';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent implements OnInit {

  listOfLocations: any;
  locationInf: any[];

  @Input() bgColor;

  constructor(private service:LocationService, public  initService: InitJsService) {

  }


  ngOnInit() {
    this.listOfLocations = this.service.LIST_OF_LOCATIONS;

    this.listOfLocations.forEach(loc => {
      this.service.getLocationById(loc.slug)
        .then((data) => {

          loc.info = data[0];

        });
      this.service.getLocationLinksByField(loc.slug, 'home').
      then( links => {

        loc.link = links[0];

      });

    });
  }

}
