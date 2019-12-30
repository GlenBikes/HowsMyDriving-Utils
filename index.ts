const packpath = require('packpath');
const appRootDir = require('app-root-dir').get();
const appRootPath = require('app-root-path');

import * as path from 'path';

let packpath_parent = packpath.parent() ? packpath.parent() : packpath.self();
let packpath_self = packpath.self();

console.log(
  'index.ts ' +
    `howsmydriving-utils:\n - packpath_self: ${packpath_self}\n - packpath_parent: ${packpath.parent()}\n - app-root-dir: ${appRootDir}\n - app-root-path: ${appRootPath}\n - app-root (current): see below\n - app-root (root): see below\n - __dirname: ${__dirname}\n - .: ${path.resolve(
      '.'
    )}`
);

export const log4js_config_path = path.resolve(
  appRootDir + '/dist/config/log4js.json'
);

console.log(
  'index.ts ' +
    `howsmydriving-utils: log4js_config_path:\n - ${log4js_config_path}`
);

import './src/util/extend/string-ext';
import { DumpObject } from './src/util/string_utils';

import { log } from './src/logging';

const package_json_path = path.join(packpath_self, '/package.json');

let pjson = require(package_json_path);

export { ICitation } from './src/interfaces/icitation';

export { Citation } from './src/interfaces/icitation';
export { IRegion } from './src/interfaces/iregion';
export { Region } from './src/interfaces/iregion';
export { CitationIds } from './src/citationIds';

export { formatPlate } from './src/util/licensehelper';
export { StatesAndProvinces } from './src/util/licensehelper';

export { DumpObject } from './src/util/string_utils';
export { CompareNumericStrings } from './src/util/string_utils';
export { SplitLongLines } from './src/util/string_utils';

export { sleep } from './src/util/process';

export { createTweet } from './test/mocks/twitter';
export { PrintTweet } from './test/mocks/twitter';

log.info(`Module ${pjson.name} version '${pjson.version}' loaded.`);
