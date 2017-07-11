var EventPage = {

  init: function(webdriver) {
    this.driver = webdriver;
  },

  visit: function(url) {
    return this.driver.get(url);
  },

  scrollDown: function() {
    function scrollDown() {
      window.scrollTo(0, arguments[0]);
    }
    return this.driver.executeScript(scrollDown, 800);
  }
};

module.exports = EventPage;
