import {PT} from '../app/globals';

export const environment = {
    production: true,
    // 8:20 A.M on a Monday Morning
    now: {
        time: PT.from('08:20'),
        day: 1
    }
};
