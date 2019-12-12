import './src/interfaces/string-ext';

import {log} from './src/logging';

var path = require('path'),
    pjson = require(path.resolve(__dirname + '/../package.json'));

export {ICitation} from './src/interfaces/icitation';
export {Citation} from './src/interfaces/icitation';
export {IRegion} from './src/interfaces/iregion';
export {CitationIds} from './src/citationIds';

export {formatPlate} from './src/util/licensehelper';
export {StatesAndProvinces} from './src/util/licensehelper';

export {CompareNumericStrings} from './src/util/string_utils';
export {DumpObject} from './src/util/string_utils';
export {SplitLongLines} from './src/util/string_utils';
export {PrintTweet} from './src/util/string_utils';

log.info(`Module ${pjson.name} version '${pjson.version}' loaded.`);
