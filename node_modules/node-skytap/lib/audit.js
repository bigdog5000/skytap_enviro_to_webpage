var debug     = require('debug')('skytap-usage')
  , Q         = require('q')
  , arghelper = require('./arghelper')
  , rest      = require('./rest')
  , vargs     = require('vargs-callback');


/** 
 * Audit API helper:
 * http://help.skytap.com/#API_Documentation.html#Auditing
 *
 * THIS MODULE DOES NOT WORK WITH V2
 *
 * @param {Skytap} reference to parent object
 */
function Audit(skytap) {
  this.getArgs = function getArgs() {
    return skytap.getArgs();
  };
}


/**
 * Export the module
 */
module.exports = Audit;


/**
 * Check an audit report status
 *  
 * @param {Object} params

 * @config {String} activity
 * @config {Number} user
 * @config {Number} department
 * @config {Number} project
 * @config {String} region
 * @config {Object} date_start
 * @config {Object} date_end
 * @config {Number} environment_id
 * @callback {Function} next
 * @return {Promise}
 */
Audit.prototype.create = function post(params, next) {
  debug('get %j', params);

  var args = this.getArgs();
  args.url = 'https://cloud.skytap.com/auditing/exports.json';
  args.params = params;
  return rest.apiPost(args, next);
};


/**
 * Check an audit report status
 *
 * @param {Object} params
 * @config {Number} report_id
 * @callback {Function} next
 * @return {Promise}
 */
Audit.prototype.check = function get(params, next) {
  debug('get %j', params);

  var args = this.getArgs();
  args.url = 'https://cloud.skytap.com/auditing/exports/'+params.report_id;
  return rest.apiGet(args, next);
};

/**
 * Fetch a report
 *
 * @param {Object} params
 * @config {Number} report_id
 * @callback {Function} next
 * @return {Promise}
 */
Audit.prototype.fetch = function get(params, next) {
  debug('get %j', params);

  var args = this.getArgs();
  args.url = 'https://cloud.skytap.com/auditing/exports/'+params.report_id+'.csv';
  return rest.apiGet(args, next);
};
