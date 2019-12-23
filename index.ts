const packpath = require('packpath');

import './src/util/extend/string-ext';
import { DumpObject } from 'howsmydriving-utils';

import { log } from './src/logging';

var path = require('path');

let packpath_parent = packpath.parent() ? packpath.parent() : packpath.self();
let packpath_self = packpath.self();

const package_json_path = path.join(packpath_self, '/package.json');

log.info(`package.json path: ${package_json_path}.`);

let pjson = require(package_json_path);

export { ICitation } from './src/interfaces/icitation';

export { Citation } from './src/interfaces/icitation';
export { IRegion } from './src/interfaces/iregion';
export { Region } from './src/interfaces/iregion';
export { CitationIds } from './src/citationIds';

export { formatPlate } from './src/util/licensehelper';
export { StatesAndProvinces } from './src/util/licensehelper';

export { CompareNumericStrings } from './src/util/string_utils';
export { DumpObject } from './src/util/string_utils';
export { SplitLongLines } from './src/util/string_utils';

//export { GetMutexClient } from './src/util/process';
export { sleep } from './src/util/process';

export { createTweet } from './test/mocks/twitter';
export { PrintTweet } from './test/mocks/twitter';

log.info(`Module ${pjson.name} version '${pjson.version}' loaded.`);
