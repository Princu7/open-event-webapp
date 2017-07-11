'use strict';

const assert = require('chai').assert;
var fold = require('../src/backend/fold.js');
var generator = require('../src/backend/generator.js');
var dist = require('../src/backend/dist.js');
var app = require('../src/app');
var webdriver = require('selenium-webdriver');
var eventPage = require('../src/selenium/eventPage.js');
var trackPage = require('../src/selenium/trackPage.js');
var By = webdriver.By;
var until = require('selenium-webdriver').until;

describe('generate', function() {
  describe('.create different event sites and copy assets of overview site', function() {
    this.timeout(800000);

    it('should generate the FOSSASIA Summit 2014', function(done) {
      var data = {};

      data.body = {
        "email": "a@a.c",
        "name": "Open Event",
        "apiendpoint": "https://raw.githubusercontent.com/fossasia/open-event/master/sample/FOSSASIA14/",
        "datasource": "eventapi",
        "assetmode" : "download",
      };

      generator.createDistDir(data, 'Socket', function(appFolder) {
        assert.equal(appFolder, "a@a.c/FOSSASIA2014");
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
      eventPage.init(driver);
      eventPage.visit('http://localhost:5000/live/preview/a@a.c/FOSSASIA2014');
      //driver.get('http://localhost:5000/live/preview/a@a.c/FOSSASIA2014');
    });

    //it('Checking the title of the page', function(done) {
      //driver.wait(until.elementLocated(By.css('h1'), 20000));

      //driver.findElement(By.css('h1')).getText().then(function(text) {
        //console.log(text);
        //assert.equal(text, "FOSSASIA 2014");
        //done();
      //})
      //eventPage.getEventName().then(function(text) {
        //console.log(text);
        //assert.equal(text, "FOSSASIA 2014");
        //done();
      //});
    //});

    it('Check whether the down button is working or not', function(done) {

      //function scroll() {
        //window.scrollTo(0, arguments[0]);
      //}

      //driver.executeScript(scroll, 800).then(function(offset) {
        //console.log(offset);
        //done();
      //});

      eventPage.checkDownButton().then(function(offset) {
        console.log(offset);
        assert.equal(offset, 0);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });

});
