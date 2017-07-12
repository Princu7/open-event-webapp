module.exports = {

  init: function(webdriver) {
    this.driver = webdriver;
  },

  visit: function(url) {
    return this.driver.get(url);
  },

  scrollDown: function() {
    function scroll() {
      window.scrollTo(0, arguments[0]);
    }
    return this.driver.executeScript(scroll, 800);
  }
};
