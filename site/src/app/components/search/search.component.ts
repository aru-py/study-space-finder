import {Component, HostListener, OnInit} from '@angular/core';
import {Room} from '../../models/room';
import {SearchService} from '../../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

    _query: string;
    results: Room[] = [];

    numRoomsToShow = 5;
    selectedRoom: Room;

    constructor(public searcher: SearchService,
                private router: Router,
                private route: ActivatedRoute,
                private title: Title) {
    }


    ngOnInit() {
        // for testing
        if (!environment.production) {
            this.search(this.query);
        }

        this._query = this.route.snapshot.queryParams['query'];

        // handle query params
        this.route.queryParams.subscribe((params) => {
            if ('query' in params) {
                let query = params['query']
                this.results = this.search(query);
                if (query) {
                    this.title.setTitle(`${query} at Clemson University`)
                } else {
                    this.title.setTitle("Find Places to Study at Clemson University")
                }
            }
        });
    }


    @HostListener('window:scroll')
    infiniteScroll() {
        let triggerHeight = 1200;
        if (document.body.scrollHeight - window.scrollY < triggerHeight) {
            if (this.numRoomsToShow < 15) {
                setTimeout(() => this.numRoomsToShow += 1, 100);

            }
        }
    }

    set query(query: string) {

        this._query = query;
        setTimeout(() => {
            if (query == this._query) {
                this.router.navigate([''],
                    {queryParams: {query: query}}
                ).then(() => this._query = query);
            }
        }, 350);


    }

    get query() {
        return this._query;
    }

    search(query) {
        return this.searcher.search(query);
    }

}
