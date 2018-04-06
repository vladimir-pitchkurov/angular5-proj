import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent implements OnInit {

  @Input() bgColor;

  constructor() { }


  ngOnInit() {
  }

}
