import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import { LocationService } from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isLeftVisible = 0;
  locationHours: any;
  activeLocationId: any;
  locationInf: any;


  constructor(private route: Router
    , private activatedRoute: ActivatedRoute,
    private meta: Meta
    , private titleService: Title
    , private service: LocationService ) {
  }

  ngOnInit() {

    this.titleService.setTitle('Home title');
    this.meta.addTag({ name: 'meta-description', content: 'description' });

    /*this.service.getLocationHours(this.activeLocationId)
      .then((data: any[]) => {
        this.locationHours = data;
      });*/

    this.activatedRoute.params.forEach((params: Params) => {
      /*this.activeLocationId = this.service.getActiveLocationId();*/
      let id = params["id"]; this.activeLocationId = id;
      this.service
        .getLocationHours(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
        .then(result => this.locationHours = result);  // как только Promise перейдет в состояние resolved присваиваем его значение свойству phrase

      this.service
        .getLocationById(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
        .then(result => this.locationInf = result);

    });



    /* this.activatedRoute.params.forEach((params: Params) => {
       let id = +params["id"]; // конвертируем значение параметра id в тип number
       this.service
         .getLocationById(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
         .then(result => this.locationInf = result);  // как только Promise перейдет в состояние resolved присваиваем его значение свойству phrase
     });*/

    /*this.service.getLocationById(this.activeLocationId)
      .then((data: any[]) => {
        this.locationInf = data;
      });
*/
  }

}
