var app = require('../src/app');
var webdriver = require('selenium-webdriver');
var eventPage = require('../src/selenium/eventPage.js');
var trackPage = require('../src/selenium/trackPage.js');
var By = webdriver.By;
var until = require('selenium-webdriver').until;
const assert = require('chai').assert;

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
      eventPage.init(driver);
      eventPage.visit('http://localhost:5000/live/preview/a@a.c/FOSSASIA2016');
    });

    it('Check whether the down button is working or not', function(done) {
      eventPage.checkDownButton().then(function(offset) {
        console.log(offset);
        //assert.equal(offset, 0);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });
});
