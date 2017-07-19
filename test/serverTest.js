var eventPage = require('../src/selenium/eventPage.js');
var assert = require('chai').assert;
var webdriver = require("selenium-webdriver");

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
      driver.get('http://sched.eventyay.com/FOSSASIASummit/index.html');
    });

    var resizeWindow = function(width, height) {
      return driver.manage().window().setSize(width, height);
    };

    var checkScrollbar = function() {
      var scrollVisible =  'return document.documentElement.scrollWidth > document.documentElement.clientWidth';
      return driver.executeScript(scrollVisible);
    };

    it('Test on screen', function(done) {
      resizeWindow(1300, 768).then(driver.sleep(3000)).then(checkScrollbar).then(function(val) {
        assert.equal(val, false);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });
});
