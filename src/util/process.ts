import { LMXClient, LMXBroker, Client, Broker } from 'live-mutex';
import * as findFreePort from 'find-port-free-sync';

import { log } from '../logging';

var mutex_broker: Broker;

function getUnusedPort(): number {
  let port = findFreePort({
    start: 1025,
    end: 49151,
    ip: '127.0.0.1'
  });

  log.info(`getUnusedPort: returning ${port}.`);
  return port;
}

export function GetMutexClient(): Promise<Client> {
  try {
    var mutex_client: Client;
    var broker_promise: Promise<Broker>;

    if (!mutex_broker) {
      log.info(`Creating mutex_broker: ${new Error().stack}`);

      broker_promise = new Promise<Broker>((resolve, reject) => {
        let selected_port = getUnusedPort();

        log.debug(`Retrieved unused port: suggested: ${selected_port}.`);

        log.info(`Creating mutex_broker with port ${selected_port}.`);
        mutex_broker = new LMXBroker({ port: selected_port });
        mutex_broker.emitter.on('warning', function() {
          log.warn(...arguments);
        });

        mutex_broker.emitter.on('error', function() {
          log.error(...arguments);
        });

        log.info(
          `Mutex broker created, listening on port ${mutex_broker.port}.`
        );

        resolve(mutex_broker);
      });
    } else {
      broker_promise = Promise.resolve(mutex_broker);
    }

    return new Promise<Client>((resolve, reject) => {
      broker_promise
        .then(mutex_broker => {
          log.debug(
            `Successfully ensured mutex broker listening on port ${mutex_broker.getListeningInterface()}.`
          );

          log.debug(`Creating mutex client.`);

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

              resolve(mutex_client);
            })
            .catch((err: Error) => {
              log.info(`Failed to connect mutex client. Err: ${err}.`);
              throw err;
            });
        })
        .catch(err => {
          log.error(`Error creating mutex broker or client: ${err}.`);
          throw err;
        });
    });
  } catch (err) {
    log.error(`Error creating mutex broker or client: ${err}.`);
    throw err;
  }
}

process
  .on('exit', code => {
    log.info(`Process exiting with exit code: ${code}.`);
    if (mutex_broker) {
      mutex_broker.close(() => {
        log.info('Mutex broker is closed.');
      });
    }
  })
  .on('uncaughtException', err => {
    log.error(`Caught exception: ${err}\n`);

    if (mutex_broker) {
      mutex_broker.close(() => {
        log.info('Mutex broker is closed.');
      });
    }
  })
  .on('unhandledRejection', (reason, promise) => {
    log.error(
      `Unhandled Rejection at: promise: ${promise.toString()}, reason: ${reason}.`
    );

    if (mutex_broker) {
      mutex_broker.close(() => {
        log.info('Mutex broker is closed.');
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
