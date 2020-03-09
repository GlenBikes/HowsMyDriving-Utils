/**
 * Add lpad(string, number) to String prototype
 *
 * Params:
 *   pad:    character to prepend to string to make it length.
 *   l: length of string returned
 * Returns:
 *   string of length >= l where pad character is prepended to string
 *   enough times to satisfy length requirement. If string.length >= l,
 *   then the string is returned.
 *
 * Exceptions:
 *   If pad is not a single character, an Error is thrown.
 *
 * See: string-ext.d.ts
 **/

declare interface Date {
  dateDiff(datepart: string, todate: Date): number;
  dateDiffString(d1: Date, d2: Date): string;
}

// not sure why I can't make this extended function work...
Date.prototype.dateDiff = function(this: Date, datepart: string, todate: Date) {
  datepart = datepart.toLowerCase();
  var diff = Math.abs(todate.getTime() - this.getTime());
  var divideBy = { w: 604800000, d: 86400000, h: 3600000, n: 60000, s: 1000 };

  return Math.floor(diff / divideBy[datepart]);
};

Date.prototype.dateDiffString = function(this: Date, d2: Date): string {
  let year_diff: number = this.dateDiff('y', d2);
  let month_diff: number = this.dateDiff('m', d2);
  let day_diff: number = this.dateDiff('d', d2);
  let hour_diff: number = this.dateDiff('h', d2);
  let min_diff: number = this.dateDiff('n', d2);

  let date_diff_str =
    (year_diff > 0 ? `${year_diff} year${plural(year_diff)}, ` : '') +
    (month_diff > 0 ? `${month_diff} month${plural(month_diff)}, ` : '') +
    (day_diff > 0 ? `${day_diff} day${plural(day_diff)}, ` : '') +
    (year_diff == 0 && month_diff == 0 && day_diff <= 1)
      ? (day_diff == 0 ? '' : ', ') + `${hour_diff} hour${plural(hour_diff)}`
      : '' + (year_diff == 0 && month_diff == 0 && day_diff == 0)
      ? `, ${min_diff} minute${plural(min_diff)}`
      : '';

  return date_diff_str;
};

function plural(n: number): string {
  let ret = 's';
  if (n == 1) {
    ret = '';
  }

  return ret;
}
