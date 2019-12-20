import { LMXClient, LMXBroker, Client, Broker } from 'live-mutex';
import * as getPort from 'get-port';

import { log } from '../logging';

// One global broker for the live-mutex clients.
const mutex_default_port: number = 8654;
var mutex_broker: Broker;

export function GetMutexClient(): Client {
  var mutex_client: Client;

  try {
    if (!mutex_broker) {
      let opts = { port: mutex_default_port };

      if (process.env.LMXPORT) {
        opts.port = parseInt(process.env.LMXPORT, 10);

        if (opts.port === NaN) {
          log.warn(
            `Invalid LMXPORT specified. Defaulting to ${mutex_default_port}.`
          );
          opts.port = mutex_default_port;
        }
      }
      mutex_broker = new LMXBroker(opts);
      mutex_broker.emitter.on('warning', function() {
        log.warn(...arguments);
      });

      mutex_broker.emitter.on('error', function() {
        log.error(...arguments);
      });

      log.info(`Mutex broker created, listening on port ${mutex_broker.port}.`);
    }

    mutex_broker
      .ensure()
      .then(() => {
        log.debug(
          `Successfully created mutex broker listening on port ${mutex_broker.getListeningInterface()}.`
        );

        mutex_client = new LMXClient({ port: mutex_broker.port });

        mutex_client.emitter.on('info', function() {
          log.debug(...arguments);
        });

        mutex_client.emitter.on('warning', function() {
          log.warn(...arguments);
        });

        mutex_client.emitter.on('error', function() {
          log.error(...arguments);
        });

        mutex_client
          .connect()
          .then(client => {
            log.info(
              `Successfully created mutex client on port ${mutex_broker.port}.`
            );
          })
          .catch((err: Error) => {
            log.info(`Failed to connect mutex client. Err: ${err}.`);
            throw err;
          });
      })
      .catch(err => {
        log.error(`Error creating mutex client: ${err}.`);
        throw err;
      });
  } catch (err) {
    log.error(`Error creating mutex client: ${err}.`);
    throw err;
  }

  return mutex_client;
}

process
  .on('exit', code => {
    log.info(`Process exiting with exit code: ${code}.`);
    if (mutex_broker) {
      mutex_broker.close(() => {
        log.info('Server is closed.');
      });
    }
  })
  .on('uncaughtException', err => {
    log.error(`Caught exception: ${err}\n`);

    if (mutex_broker) {
      mutex_broker.close(() => {
        log.info('Server is closed.');
      });
    }
  })
  .on('unhandledRejection', (reason, promise) => {
    log.error(
      `Unhandled Rejection at: promise: ${promise.toString()}, reason: ${reason}.`
    );

    if (mutex_broker) {
      mutex_broker.close(() => {
        log.info('Server is closed.');
      });
    }
  });

// Fake a sleep function. Call this thusly:
// sleep(500).then(() => {
//   do stuff
// })
// Or similar pattrs that use a Promise
export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
