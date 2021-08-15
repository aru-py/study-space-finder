import {Injectable} from '@angular/core';
import {Room} from '../models/room.js';
import * as rooms from '../../assets/data/rooms.json';

// import Module from '@types/node';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // todo module

    rooms = (rooms as any).default.map(
        r => new Room(r['room'], r['courses'])
    );

}
