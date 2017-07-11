var EventPage = {

  init: function(webdriver) {
    this.driver = webdriver;
  },

  visit: function(url) {
    return this.driver.get(url);
  },

  scrollDown: function(func) {
    //function scroll() {
      //window.scrollTo(0, arguments[0]);
    //}
    return this.driver.executeScript(func, 800);
  }
};

module.exports = EventPage;
