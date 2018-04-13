import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent implements OnInit {

  listOfLocations: any;
  locationInf: any[];

  @Input() bgColor;

  constructor(private service:LocationService) {

  }


  ngOnInit() {
    this.listOfLocations = this.service.LIST_OF_LOCATIONS;




    this.listOfLocations.forEach(loc => {
      this.service.getLocationById(loc.slug)
        .then((data) => {
          // console.log(data);
          loc.info = data[0];

          console.log('this.listOfLocations',this.listOfLocations);
        });
    })
  }

  getLocationInf(id: any){

    if(!id){
      return;
    }

    let dataI;

    this.service.getLocationById(id)
      .then((data: any[]) => {
        dataI = data;
        return dataI;
    });




  }



}
