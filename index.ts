import './src/util/extend/string-ext';
import { DumpObject } from './src/util/string_utils';

import { log } from './src/logging';

export { ICitation } from './src/interfaces/icitation';
export { Citation } from './src/interfaces/icitation';

export { ICollision } from './src/interfaces/icollision';
export { Collision } from './src/interfaces/icollision';

export { IRegion } from './src/interfaces/iregion';
export { Region } from './src/interfaces/iregion';

export { IStateStore } from './src/interfaces/istatestore';

export { CitationIds } from './src/citationIds';

export { formatPlate } from './src/util/licensehelper';
export { StatesAndProvinces } from './src/util/licensehelper';

export { DumpObject } from './src/util/string_utils';
export { CompareNumericStrings } from './src/util/string_utils';
export { SplitLongLines } from './src/util/string_utils';

export { sleep } from './src/util/process';

export { createTweet } from './test/mocks/twitter';
export { PrintTweet } from './test/mocks/twitter';

import { __MODULE_NAME__, __MODULE_VERSION__ } from './src/logging';

log.info(
  `howsmydriving-utils: Loaded ${__MODULE_NAME__} version ${__MODULE_VERSION__}.`
);
