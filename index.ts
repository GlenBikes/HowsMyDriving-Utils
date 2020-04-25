import './src/util/extend/string-ext';
import { DumpObject } from './src/util/string_utils';

import { log } from './src/logging';

export { ICitation, Citation } from './src/interfaces/icitation';

export { ICollision, Collision } from './src/interfaces/icollision';

export { IRegion, Region, RegionFactory } from './src/interfaces/iregion';

export { IStateStore } from './src/interfaces/istatestore';

export { CitationIds } from './src/citationIds';

export { DateDiff, DateDiffStr } from './src/util/datehelper';

export { plural } from './src/util/extend/date-ext';

export { formatPlate, StatesAndProvinces } from './src/util/licensehelper';

export { IMediaItem, MediaItem, MediaItemsFromString } from './src/util/media';

export {
  CompareNumericStrings,
  DumpObject,
  SplitLongLines
} from './src/util/string_utils';

export { sleep } from './src/util/process';

export { createTweet } from './test/mocks/twitter';
export { PrintTweet } from './test/mocks/twitter';

import { __MODULE_NAME__, __MODULE_VERSION__ } from './src/logging';

log.info(
  `howsmydriving-utils: Loaded ${__MODULE_NAME__} version ${__MODULE_VERSION__}.`
);
