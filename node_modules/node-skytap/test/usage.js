var chai      = require('chai')
  , expect    = chai.expect
  , Skytap    = require('../lib/skytap')
  , nockspect = require('./util/nockspect')
  , _         = require('underscore');

describe('Skytap.usage', function () {
  var skytap = Skytap.init({ username: 'foo', token: 'bar' });

  describe('.create', function () {
    it('create a SkyTap usage report', function () {
      return nockspect(function (nock) {
        var param = {
          start_date: '2015/04/01 00:00:00 -0800'
          ,end_date: '2015/04/30 23:59:59 -0800'
          ,resource_type: 'svms'
          ,region: 'all'
          ,group_by: 'department'
          ,aggregate_by: 'day'
          ,results_format: 'csv'
          ,utc: 'true'
        };

        nock.post('/reports', param).reply(200);
        return _.bind(skytap.usage.create, skytap.usage, param);
      });
    });
  });

  describe('.check', function () {
    it('check a SkyTap usage report', function () {
      return nockspect(function (nock) {
        nock.get('/reports/123456').reply(200);
        return _.bind(skytap.usage.check, skytap.usage, {
          report_id: 123456
        });
      });
    });
  });

  describe('.fetch', function () {
    it('fetch a SkyTap usage report', function () {
      return nockspect(function (nock) {
        nock.get('/reports/123456.csv').reply(200);
        return _.bind(skytap.usage.fetch, skytap.usage, {
          report_id: 123456
          ,extension: 'csv'
        });
      });
    });
  });

});
