import {Temporal} from '@js-temporal/polyfill';

export interface Course {
    course: string,
    days: number[]; // Sun (0), Mon (1), ... // todo change...
    times: Temporal.PlainTime[]; // actually string at first
}
