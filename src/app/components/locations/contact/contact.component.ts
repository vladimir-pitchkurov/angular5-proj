import {Component, DoCheck,  OnInit} from '@angular/core';
import { Meta} from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, DoCheck {

  activeLocationId: any;
  locationInf: any;
  validation_msg: any;

  constructor(  private route: Router
              , private activatedRoute: ActivatedRoute
              , private meta: Meta
              , private titleService: Title
              , private service: LocationService ) {  }

  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"]; this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;

      this.service
        .getLocationById(id)
        .then(result => this.locationInf = result);
    });
  }

  ngDoCheck() {
    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }
  }

  sendPostContact(id, userName, userEmail, userPhone, userMessage) {
    let data = new FormData();
    data.append('location_id', id);
    data.append('user_name', userName);
    data.append('user_email', userEmail);
    data.append('user_phone', userPhone);
    data.append('user_message', userMessage);

    this.service
      .sendPostContact(data)
      .then(result => {
        this.validation_msg = result;
      });
  }
}
