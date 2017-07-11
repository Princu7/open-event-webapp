'use strict';

const assert = require('chai').assert;
var fold = require('../src/backend/fold.js');
var generator = require('../src/backend/generator.js');
var dist = require('../src/backend/dist.js');
var app = require('../src/app');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;

describe('generate', function() {
  describe('.create different event sites and copy assets of overview site', function() {
    this.timeout(800000);

    it('should generate the FOSSASIA Summit 2017', function(done) {
      var data = {};

      data.body = {
        "email": "a@a.com",
        "name": "Open Event",
        "apiendpoint": "http://eventyay.com/api/v1/events/6",
        "datasource": "eventapi",
        "assetmode" : "download",
      };

      generator.createDistDir(data, 'Socket', function(appFolder) {
        assert.equal(appFolder, "a@a.com/FOSSASIASummit");
        done();
      });

    });

  });
});

describe("Running Selenium tests on Chrome Driver", function() {
  this.timeout(600000);
  var driver;
  before(function() {
    if (process.env.SAUCE_USERNAME !== undefined) {
      driver = new webdriver.Builder()
        .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
        .withCapabilities({
          'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
          build: process.env.TRAVIS_BUILD_NUMBER,
          username: process.env.SAUCE_USERNAME,
          accessKey: process.env.SAUCE_ACCESS_KEY,
          browserName: "chrome"
        }).build();
    } else {
      driver = new webdriver.Builder()
        .withCapabilities({
          browserName: "chrome"
        }).build();
    }
  });

  after(function() {
    return driver.quit();
  });

  describe('Testing event page', function() {

    before(function() {
      driver.get('http://localhost:5000/live/preview/a@a.com/FOSSASIASummit');
    });

    it('Checking the scroll', function(done) {
      function scrollDown() {
        window.scrollTo(0, 800);
      }

      driver.executeScript(scrollDown, 800).then(function() {
        done();
      });

    });
  });
});
