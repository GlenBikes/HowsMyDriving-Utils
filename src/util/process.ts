import * as path from 'path';
import * as fs from 'fs';
import * as findFreePort from 'find-port-free-sync';

// Fake a sleep function. Call this thusly:
// sleep(500).then(() => {
//   do stuff
// })
// Or similar pattrs that use a Promise
export function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function getAppRootPath(): string {
  let root_path = path.resolve(__dirname + '/../../');

  if (!fs.existsSync(path.resolve(root_path, 'package.json'))) {
    root_path = path.resolve(__dirname + '/../../../');

    if (!fs.existsSync(path.resolve(root_path, 'package.json'))) {
      throw new Error(`Cannot find app root path containing package.json: ${__dirname}.`);
    }
  }

  return root_path;
}
