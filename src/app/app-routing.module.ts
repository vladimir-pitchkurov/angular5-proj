import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscapeRoomComponent } from './components/escape-room/escape-room.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { TrampolinePartiesComponent } from './components/trampoline-parties/trampoline-parties.component';
import { ComingSoonComponent } from './components/locations/coming-soon/coming-soon.component';
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
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TrampolineHomeComponent } from './components/locations/trampoline-home/trampoline-home.component';
import { TrampolineParkComponent } from './components/trampoline-park/trampoline-park.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'trampoline-park', component: TrampolineParkComponent },
  { path: 'trampoline-parties', component: TrampolinePartiesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:post', component: BlogPostComponent },
  { path: 'escape-room', component: EscapeRoomComponent },
  { path: ':id', component: HomeComponent },
  { path: ':id/about/coming-soon', component: ComingSoonComponent },
  { path: ':id/about/join-our-team', component: JoinourteamComponent },
  { path: ':id/about/gallery', component: GalleryComponent },
  { path: ':id/about/about', component: AboutComponent },
  { path: ':id/about/contact', component: ContactComponent },
  { path: ':id/trampoline-park', component: TrampolinesHomepageComponent },
  { path: ':id/trampoline-park/rules', component: RulesComponent },
  { path: ':id/trampoline-park/activities', component: ActivitiesComponent },
  { path: ':id/trampoline-park/waiver', component: WaiverComponent },
  { path: ':id/trampoline-park/groups', component: GroupsComponent },
  { path: ':id/trampoline-park/buy-a-pass', component: PassComponent },
  { path: ':id/trampoline-park/birthday-parties', component: PartiesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
