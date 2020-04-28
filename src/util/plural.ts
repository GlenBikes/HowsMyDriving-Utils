export function plural(n: number): string {
  let ret = 's';
  if (n == 1) {
    ret = '';
  }

  return ret;
}
