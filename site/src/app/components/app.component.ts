import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {


    constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle("Find Places to Study at Clemson University")
    }

}
