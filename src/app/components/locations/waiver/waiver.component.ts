import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.css']
})
export class WaiverComponent implements OnInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Waiver');
        this.meta.addTag({ name: 'meta-description', content: 'Waiver description' });
    }

}
