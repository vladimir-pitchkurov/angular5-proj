import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import {InitJsService} from './services/init-js.service';
import { TrampolineParkComponent } from './components/trampoline-park/trampoline-park.component';
import { EscapeRoomComponent } from './components/escape-room/escape-room.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { TrampolinePartiesComponent } from './components/trampoline-parties/trampoline-parties.component';
import { ComingSoonComponent } from './components/locations/coming-soon/coming-soon.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { HomeComponent } from './components/locations/home/home.component';
import { JoinourteamComponent } from './components/locations/joinourteam/joinourteam.component';
import { GalleryComponent } from './components/locations/gallery/gallery.component';
import { RulesComponent } from './components/locations/rules/rules.component';
import { AboutComponent } from './components/locations/about/about.component';
import { ContactComponent } from './components/locations/contact/contact.component';
import { ActivitiesComponent } from './components/locations/activities/activities.component';
import { WaiverComponent } from './components/locations/waiver/waiver.component';
import { GroupsComponent } from './components/locations/groups/groups.component';
import { TrampolinesHomepageComponent } from './components/locations/trampolines-homepage/trampolines-homepage.component';
import { PassComponent } from './components/locations/pass/pass.component';
import { PartiesComponent } from './components/locations/parties/parties.component';
import {BaseHttpService} from './services/base-http.service';
import {LocationService} from './services/location.service';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { Slider2Component } from './components/slider2/slider2.component';
import { TrampolineHomeComponent } from './components/locations/trampoline-home/trampoline-home.component';
import { AllLocationsComponent } from './components/partials/all-locations/all-locations.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    TrampolineParkComponent,
    EscapeRoomComponent,
    BlogComponent,
    BlogPostComponent,
    TrampolinePartiesComponent,
    ComingSoonComponent,
    MainSliderComponent,
    HomeComponent,
    JoinourteamComponent,
    GalleryComponent,
    RulesComponent,
    AboutComponent,
    ContactComponent,
    ActivitiesComponent,
    WaiverComponent,
    GroupsComponent,
    TrampolinesHomepageComponent,
    PassComponent,
    PartiesComponent,
    FooterComponent,
    WelcomeComponent,
    Slider2Component,
    TrampolineHomeComponent,
    AllLocationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    InitJsService,
    BaseHttpService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
