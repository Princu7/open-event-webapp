const assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var eventPage = require('../src/selenium/eventPage.js')

//var eventPage = {

  //init: function(webdriver) {
    //this.driver = webdriver;
  //},

  //visit: function(url) {
    //return this.driver.get(url);
  //},

  //scrollDown: function() {
    //function scroll() {
      //window.scrollTo(0, arguments[0]);
    //}
    //return this.driver.executeScript(scroll, 800);
  //}
//};

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
      eventPage.visit('http://reddit.com');
    });

    it('Checking the scroll', function(done) {
      eventPage.scrollDown().then(function() {
        console.log("Hello from the other side.");
        done();
      });
    });
  });
});
