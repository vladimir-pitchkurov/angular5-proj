import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

    isLeftVisible = 0;
    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('coming soon');
        this.meta.addTag({ name: 'meta-keywords', content: 'coming keywords' });
        this.meta.addTag({ name: 'meta-description', content: 'coming description' });
    }

}
