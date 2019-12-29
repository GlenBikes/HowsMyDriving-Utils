//import { LMXClient, LMXBroker, Client, Broker } from 'live-mutex';
import * as findFreePort from 'find-port-free-sync';

import { log } from '../logging';

// Fake a sleep function. Call this thusly:
// sleep(500).then(() => {
//   do stuff
// })
// Or similar pattrs that use a Promise
export function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
