export function DateDiff(datepart: string, a: Date, b: Date) {
  datepart = datepart.toLowerCase();
  var diff = Math.abs(b.getTime() - a.getTime());
  var divideBy = { w: 604800000, d: 86400000, h: 3600000, n: 60000, s: 1000 };

  return Math.floor(diff / divideBy[datepart]);
}
