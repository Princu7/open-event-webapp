var BasePage = require('./basePage.js');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var EventPage = Object.create(BasePage);

//EventPage.getEventName = function() {
  //return this.find(By.css('h1')).getText().then(function(name) {
    //return name;
  //});
//};

EventPage.checkDownButton = function() {
  var self = this;

  function scrollDown() {
    window.scrollTo(0, arguments[0]);
  }

  //function scrollPosition() {
  //return window.scrollY;
  //}

  return self.driver.executeScript(scrollDown, 800);

  //return self.driver.executeScript(scrollDown, 800).then(self.find.bind(self, By.id('down-button'))).then(function(el) {
  //return el.click().then(self.driver.sleep(1000)).then(function() {
  //return self.driver.executeScript(scrollPosition);
  //});
  //});
};

module.exports = EventPage;
