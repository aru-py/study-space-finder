import {Injectable} from '@angular/core';
import {Room} from '../models/room.js';
import * as rooms from '../../assets/data/rooms.json';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    rooms = (rooms as any).default.map(
        r => new Room(r['room'], r['courses'])
    );

}
