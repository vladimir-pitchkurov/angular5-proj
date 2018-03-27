import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-trampolines-homepage',
  templateUrl: './trampolines-homepage.component.html',
  styleUrls: ['./trampolines-homepage.component.css']
})
export class TrampolinesHomepageComponent implements OnInit {

    constructor(private meta: Meta,
                private titleService: Title,
                ) {
    }

    ngOnInit() {
        this.titleService.setTitle('GrTrampolines Homepageoups');
        this.meta.addTag({ name: 'meta-description', content: 'Trampolines Homepage description' });
    }

}
