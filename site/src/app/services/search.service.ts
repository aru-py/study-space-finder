import {Injectable} from '@angular/core';
import Fuse from 'fuse.js';
import {DataService} from './data.service';
import {Room} from '../models/room';


@Injectable({
    providedIn: 'root'
})
export class SearchService {

    fuse; // fuse.js

    constructor(private data: DataService) {

        // create a fuse
        this.fuse = new Fuse(data.rooms, {
            keys: ['name'],
            tokenize: true,
            threshold: .5
        });
    }

    search(query): [Room] {
        return this.fuse.search(query);
    }
}
