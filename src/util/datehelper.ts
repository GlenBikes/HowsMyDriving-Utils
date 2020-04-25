import { plural } from './extend/date-ext';
import { log } from '../logging';

const time_delta = require('../../lib/time-delta');

const td = time_delta.create();

export function DateDiff(datepart: string, a: Date, b: Date): number {
  datepart = datepart.toLowerCase();
  let diff: number = Math.abs(b.getTime() - a.getTime());
  let divideBy: { [key: string]: number } = {
    w: 604800000,
    d: 86400000,
    h: 3600000,
    n: 60000,
    s: 1000
  };

  return Math.floor(diff / divideBy[datepart]);
}

export function DateDiffStr(d1: Date, d2: Date): string {
  let date_diff_str = td.format(d1, d2);

  return date_diff_str;
}
