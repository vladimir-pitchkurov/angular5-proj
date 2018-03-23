import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitJsService} from './services/init-js.service';
import {NavigationEnd, Router} from '@angular/router';
import {LocationService} from './services/location.service';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'app';
  locations: any;
  service: LocationService;
  activeLocationId: any;
  locationInf: any[];
  socialInf: any[];
  isDarkFooter: boolean = false;
  facebook_link: any[];
  twitter_link: any[];
  instagram_link: any[];
  google_link: any[];

  constructor(private router: Router, private service: LocationService) { }

  ngOnInit() {
    this.activeLocationId = this.service.getActiveLocationId();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      // this.getAddressInfoByZip('72223', 'desktop');
      this.defineIsFooterDark();
    });

    this.service.getAllLocations()
      .then((data: any[]) => {
        this.locations = data;
      });

    this.service.getLocationById(this.activeLocationId)
      .then((data: any[]) => {
        this.locationInf = data;
      });

    this.service.getLocationSocial(this.activeLocationId)
      .then((data: any[]) => {
        this.socialInf = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
      .then((data: any[]) => {
        this.facebook_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
      .then((data: any[]) => {
        this.twitter_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
      .then((data: any[]) => {
        this.instagram_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'google')
      .then((data: any[]) => {
        this.google_link = data;
      });

  }

  ngAfterViewInit ()
  {
    InitJsService.initMenu();
    // InitJsService.initLocScroll();
    InitJsService.initMobileMenu();
    //InitJsService.initEscape();
  }


  defineIsFooterDark()
  {
    let pagesWithDarkFooter: string[] = [
      '/escape-room',
      'trampoline-parties'
    ];

    this.isDarkFooter = pagesWithDarkFooter.indexOf(this.router.url) !== -1 || this.router.url.indexOf('/blog/') !== -1;
  }

  setLocationById(id: any) {
    /*this.activeLocationId = id;*/
    this.service.setActiveLocationId(id);
    this.activeLocationId = this.service.getActiveLocationId();
    console.log(this.activeLocationId);
  }

  refreshId(){}

  // getAddressInfoByZip(zip, device) {
  //     if (zip.length >= 5 && typeof google != 'undefined') {
  //         var addr = {};
  //         var geocoder = new google.maps.Geocoder();
  //         geocoder.geocode({
  //             'address': zip
  //         }, function(results, status) {
  //             if (status == google.maps.GeocoderStatus.OK) {
  //                 if (results.length >= 1) {
  //                     var lat = results[0].geometry.location.lat();
  //                     var lng = results[0].geometry.location.lng();

  //                     var curLocation = new google.maps.LatLng(lat, lng);

  //                     for (var i = 0; i < locations.length; i++) {
  //                         pointLocation = new google.maps.LatLng(locations[i].lat, locations[i].lng);
  //                         distance = calcDistance(curLocation, pointLocation);
  //                         locations[i].distance = (distance);
  //                     }


  //                     var sorted = locations.sort(function(a, b) {
  //                         return a.distance - b.distance;
  //                     });

  //                       document.getElementById('desktop_zip_result').innerHTML = "";

  //                       for (var i = 0; i < 3; i++) {
  //                           // change ID to zip_result from zip_parks
  //                           var mydiv = document.getElementById("desktop_zip_result");
  //                           var column = document.createElement("div");
  //                           var aTag = document.createElement('a');
  //                           ///if(i < 3){
  //                           aTag.className = "active";
  //                           //}
  //                           column.setAttribute('class', "column");
  //                           aTag.setAttribute('href', sorted[i].permalink);
  //                           aTag.setAttribute('class', "find_park_result_button");
  //                           aTag.setAttribute('class', "button");
  //                           aTag.setAttribute('class', "button is-rounded");
  //                           aTag.setAttribute('onclick', "setUserLocation('" + sorted[i].permalink + "')");

  //                           if (sorted[i].external_url == "Yes") {
  //                               aTag.setAttribute('rel', "nofollow");
  //                           }

  //                           aTag.innerHTML = "<strong>" + sorted[i].title + ", " + sorted[i].abbr + "</strong> <span>" + sorted[i].distance + " mi from you</span>";
  //                           mydiv.appendChild(column);
  //                           column.appendChild(aTag);
  //                           console.log('done');
  //                       }




  //                 } else {
  //                     response({
  //                         success: false
  //                     });

  //         };

  //     } else {
  //         response({
  //             success: false
  //         });
  //     }
  // }

}
