

const { httpCode } = require('../../constants/http');

const ERROR_CODES = {
  LIVE_USER_NOT_AVAILABLE_IN_SCRAPING_JOBS: 2000
};

const ERROR_INFO = {
  [ERROR_CODES.LIVE_USER_NOT_AVAILABLE_IN_SCRAPING_JOBS]: {
    errorDescription: 'Live user not available!',
    type: 'createScrapingJob',
    errorUserTitle: '',
    errorUserMsg: 'Oops! please try again.',
    httpCode: httpCode.TOO_MANY_REQUESTS
  }
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
