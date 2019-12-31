import * as packpath from 'packpath';
import * as path from 'path';
import * as fs from 'fs';

import { getAppRootPath, sleep } from './util/process';

let packpath_parent = packpath.parent() ? packpath.parent() : packpath.self();
let packpath_self = packpath.self();

let package_json_path = path.resolve(__dirname + '/../package.json');

if (!fs.existsSync(package_json_path)) {
  package_json_path = path.resolve(__dirname + '/../../package.json');

  if (!fs.existsSync(package_json_path)) {
    throw new Error(`Cannot find package.json: ${__dirname}.`);
  }
}

var pjson = require(package_json_path);

// Put this at very top so other modules can import it without taking
// dependencies on something else in the module being instantiated.
export const __MODULE_NAME__ = pjson.name;
export const __MODULE_VERSION__ = pjson.version;

const temp_log4js_config_path = path.resolve(
  packpath_parent + '/dist/config/log4js.json'
);

if (!fs.existsSync(temp_log4js_config_path)) {
  throw new Error(`Cannot find log4js.json: ${temp_log4js_config_path}.`);
}

export const log4js_config_path = temp_log4js_config_path;

/**
 *  Standard logging for HowsMyDriving modules.
 *
 *  It is not required to use this. But if you do, your plugin module's
 *  logs will be integrated with the infrastructure logs and all the
 *  other plugin logs.
 **/
var log4js = require('log4js'),
  chokidar = require('chokidar');

// Load the config.
log4js.configure(log4js_config_path);

// Create default logger to log that our module was loaded and for
// config update changes.
var temp_log = log4js.getLogger('result');
temp_log.addContext('module', __MODULE_NAME__);
temp_log.info(`howsmydriving-utils: Adding log4js (${log4js_config_path}) context: ${__MODULE_NAME__}.`);

export const log = temp_log;

import { CitationIds } from './citationIds';

/**
 * Monitor the log4js config file and reloading log instances if the file changes.
 **/
var watcher = chokidar.watch(log4js_config_path, {
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
      log4js.configure(log4js_config_path);
      log = log4js.getLogger('reason');
      log.addContext('module', __MODULE_NAME__);
    });
  });

  /*
  log4js.shutdown(() => {
    log4js.configure(log4js_config_path);
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
