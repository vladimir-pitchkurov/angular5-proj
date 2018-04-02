import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, DoCheck {

  constructor(private meta: Meta
    , private titleService: Title
    , private service: LocationService) { }

  ngOnInit() {
    this.service.activeLocationId = undefined;
  }

  ngDoCheck(){
    this.service.activeLocationId = undefined;
  }

}
