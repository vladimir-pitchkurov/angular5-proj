import {Component, DoCheck, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  activeLocationId: any;
  locationInf: any;
  allLocationListener: any;
  galleryItems: any = [];

  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Gallery');
    this.meta.addTag({name: 'meta-description', content: 'Gallery description'});
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;
    });

    this.listenToAllLocationsLoaded();
  }


  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.loadGallery(this.activeLocationId);
    })
  }


  loadGallery(id: any)
  {
    if(!id) {
      return;
    }

    this.service.loadGallery(this.activeLocationId)
      .then(data =>{
        this.galleryItems = data;
      })
  }

}
