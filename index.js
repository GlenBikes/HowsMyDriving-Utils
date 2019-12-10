require('app-module-path').addPath(__dirname);

const logging = require(__dirname + '/src/logging.js'),
      citations = require(__dirname + '/src/citations.js');


module.exports = {
  CitationIDNoPlateFound: citations.CitationIDNoPlateFound,
  CitationIDNoCitationsFound: citations.CitationIDNoCitationsFound,
  getLog: logging.getLog,
  LogType: logging.LogType,
  MINIMUM_CITATION_ID: citations.MINIMUM_CITATION_ID
};