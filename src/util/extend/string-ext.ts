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

declare interface String {
  lpad(pad: string, length: number): string;
  trunc(n: number): string;
}

String.prototype.lpad = function(this: string, pad: string, l: number) {
  var str: string = this;

  if (!pad || pad.length != 1) {
    throw new Error(`Argument pad must be a single character.`);
  }

  while (str.length < l) {
    str = pad + str;
  }

  return str;
};

/**
 * Add trunc(number) to String prototype
 *
 * Params:
 *   n:  characters to truncate to
 * Returns:
 *   truncated string.
 *
 * See: string-ext.d.ts
 **/
String.prototype.trunc = function(n: number): string {
  if (this.length > n) {
    return this.slice(0, n - 3) + '...';
  }
  return this;
};
