var chai      = require('chai')
  , expect    = chai.expect
  , Skytap    = require('../lib/skytap')
  , nockspect = require('./util/nockspect')
  , _         = require('underscore');

describe('Skytap.audit', function () {
  var skytap = Skytap.init({ username: 'foo', token: 'bar' });

  describe('.create', function () {
    it('create a SkyTap audit report', function () {
      return nockspect(function (nock) {
        var param = {
          date_start: {
            year: '2015'
            ,month: '04'
            ,day: '30'
            ,hour: '00'
            ,minute: '00'
          }
          ,date_end: {
            year: '2015'
            ,month: '04'
            ,day: '30'
            ,hour: '23'
            ,minute: '59'
          }
        };

        nock.post('/auditing/exports.json', param).reply(200);
        return _.bind(skytap.audit.create, skytap.audit, param);
      });
    });
  });

  describe('.check', function () {
    it('check a SkyTap audit report', function () {
      return nockspect(function (nock) {
        nock.get('/auditing/exports/123456').reply(200);
        return _.bind(skytap.audit.check, skytap.audit, {
          report_id: 123456
        });
      });
    });
  });

  describe('.fetch', function () {
    it('fetch a SkyTap audit report', function () {
      return nockspect(function (nock) {
        nock.get('/auditing/exports/123456.csv').reply(200);
        return _.bind(skytap.audit.fetch, skytap.audit, {
          report_id: 123456
        });
      });
    });
  });

});
