/**
 * Add dateDiff(Date, Date) to Date class
 *
 * Params:
 *   d1: start date
 *   d2: end date
 * Returns:
 *   d2 - d1 in milliseconds.
 *
 *
 * See: date-ext.ts
**/

/**
 * Add dateDiffString(Date, Date) to Date class
 *
 * Params:
 *   d1: start date
 *   d2: end date
 * Returns:
 *   d2 - d1 as a string of the form 'xxx yyyy' where yyy is ms/seconds/minutes/hours/days'.
 *
 *
 * See: date-ext.ts
**/
declare global {
  declare interface Date {
    dateDiff(datepart: string, todate: Date): number;
    dateDiffString(d1: Date, d2: Date): string ;
  }
}