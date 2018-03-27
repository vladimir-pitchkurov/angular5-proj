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
        /*this.activeLocationId = this.service.getActiveLocationId();*/
        let id = params["id"]; this.activeLocationId = id;
        this.service
          .getLocationHours(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
          .then(result => this.locationHours = result);  // как только Promise перейдет в состояние resolved присваиваем его значение свойству phrase

        this.service
          .getLocationById(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Promise
          .then(result => this.locationInf = result);

      });
    }

}
