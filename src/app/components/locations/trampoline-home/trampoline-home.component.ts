import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-trampoline-home',
  templateUrl: './trampoline-home.component.html',
  styleUrls: ['./trampoline-home.component.css']
})
export class TrampolineHomeComponent implements OnInit {

  activeLocationId: any;

  constructor(public service : LocationService) { }

  ngOnInit() {
    this.activeLocationId = this.service.activeLocationId;
  }

}
