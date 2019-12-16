import './src/util/extend/string-ext';

import {log} from './src/logging';

var path = require('path'),
    pjson = require(path.resolve(__dirname + '/../package.json'));

export {ICitation} from './src/interfaces/icitation';
export {Citation} from './src/interfaces/icitation';
export {IRegion} from './src/interfaces/iregion';
export {Region} from './src/interfaces/iregion';
export {CitationIds} from './src/citationIds';

export {formatPlate} from './src/util/licensehelper';
export {StatesAndProvinces} from './src/util/licensehelper';

export {CompareNumericStrings} from './src/util/string_utils';
export {DumpObject} from './src/util/string_utils';
export {SplitLongLines} from './src/util/string_utils';


// TODO: Move these to into a mocks type of interface file
export {ITwitterUser} from './test/mocks/twitter';
export {ITweet} from './test/mocks/twitter';
export {createTweet} from './test/mocks/twitter';
export {PrintTweet} from './test/mocks/twitter';


log.info(`Module ${pjson.name} version '${pjson.version}' loaded.`);
