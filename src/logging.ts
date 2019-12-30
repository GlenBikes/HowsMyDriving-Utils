const packpath = require('packpath');
const appRootDir = require('app-root-dir').get();
const appRootPath = require('app-root-path');

import * as path from 'path';

let packpath_parent = packpath.parent() ? packpath.parent() : packpath.self();
let packpath_self = packpath.self();
let package_config_path = path.resolve(packpath_self + '/package.json');

console.log(
  ' logging.ts ' +
    `howsmydriving-twitter:\n - packpath_self: ${packpath_self}\n - packpath_parent: ${packpath.parent()}\n - app-root-dir: ${appRootDir}\n - app-root-path: ${appRootPath}\n - app-root (current): see below\n - app-root (root): see below\n - __dirname: ${__dirname}\n - .: ${path.resolve(
      '.'
    )}`
);

export const log4js_config_path = path.resolve(
  appRootDir + '/dist/config/log4js.json'
);

console.log(
  ' logging.ts ' +
    `howsmydriving-twitter: log4js_config_path:\n - ${log4js_config_path}`
);

import { sleep } from 'howsmydriving-utils';

/**
 *  Standard logging for HowsMyDriving modules.
 *
 *  It is not required to use this. But if you do, your plugin module's
 *  logs will be integrated with the infrastructure logs and all the
 *  other plugin logs.
 **/
var log4js = require('log4js'),
  chokidar = require('chokidar'),
  config_path = path.join(packpath_parent + '/dist/config/log4js.json'),
  pjson = require(package_config_path);

const __MODULE_NAME__ = pjson.name;
const __MODULE_VERSION__ = pjson.version;

// Load the config.
log4js.configure(config_path);

// Create default logger to log that our module was loaded and for
// config update changes.
export var log = log4js.getLogger('result');

log.addContext('module', __MODULE_NAME__);
log.info(
  `howsmydriving-utils: package_config_path: ${package_config_path}, __MODULE_NAME__: ${__MODULE_NAME__} __MODULE_VERSION__: ${__MODULE_VERSION__}.`
);

import { CitationIds } from './citationIds';

/**
 * Monitor the log4js config file and reloading log instances if the file changes.
 **/
var watcher = chokidar.watch(config_path, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  awaitWriteFinish: true
});

/**
 * Reload log4js (when config changes).
 *
 * Params:
 *   reason: Reason why logs are being reloaded. This is logged before
 *           reloading log4js.
 *
 * TODO: Test to make sure this works. Do existing loggers still work? Do
 *       they update to the new log level?
 **/
function reloadlog(reason: string) {
  /*
  log.info(`Reloading log config due to config file ${reason}.`);

  log.info(`Reloading log config due to config file ${reason}.`);
  // Leave the current log active until after we replace it.
  // This should allow any code with a stale instance to keep logging
  // until they are done.
  log4js.shutdown((err: Error) => {
    if (err) {
      log.error(`Error occurred during log shutdown: ${err}.`);
    }

    sleep(10000).then(() => {
      log4js.configure(config_path);
      log = log4js.getLogger('reason');
      log.addContext('module', __MODULE_NAME__);
    });
  });

  /*
  log4js.shutdown(() => {
    log4js.configure(config_path);
    log = log4js.getLogger('reason');
    lastdmLog = log4js.getLogger('_lastdm');
    lastmentionLog = log4js.getLogger('_lastdm');

    log.addContext('module', __MODULE_NAME__);
    lastdmLog.addContext('module', __MODULE_NAME__);
    lastmentionLog.addContext('module', __MODULE_NAME__);
  });
  */
}

// Handle the change/add events for the log4js config file.
watcher
  .on('add', (path: string) => {
    sleep(2000).then(() => {
      reloadlog(`add of ${path}`);
    });
  })
  .on('change', (path: string) => {
    sleep(2000).then(() => {
      reloadlog(`change of ${path}`);
    });
  });
