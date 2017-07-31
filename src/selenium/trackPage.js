var BasePage = require('./basePage.js');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var TrackPage = Object.create(BasePage);

TrackPage.getNoOfVisibleSessionElems = function() {
  var self = this;
  return self.findAll(By.className('room-filter')).then(self.getElemsDisplayStatus).then(function(displayArr) {
    return self.countOnesInArray(displayArr);
  });
};

TrackPage.checkIsolatedBookmark = function() {
  // Sample sessions having ids of 3014 and 3015 being checked for the bookmark feature
  var self = this;
  var bookmarkSessionsIdsArr = ['3014', '3015', '2907'];
  //var bookmarkSessionsIdsArr = ['3014', '3015'];
  var visibleCheckSessionsIdsArr = ['3014', '3015', '2918', '2907'];
  //var visibleCheckSessionsIdsArr = ['3014', '3015', '2918'];

  return self.bookmarkCheck(bookmarkSessionsIdsArr, visibleCheckSessionsIdsArr);
};


TrackPage.toggleSessionElem = function() {
  var self = this;

  // Checking the toggle behaviour of session having id 3014
  var promise = new Promise(function(resolve) {
    self.find(By.id('title-3014')).then(self.click).then(self.driver.sleep(1000)).then(function() {
      var promiseArr = [];
      promiseArr.push(self.find(By.id('desc-3014')).isDisplayed());
      promiseArr.push(self.find(By.id('desc2-3014')).isDisplayed());
      resolve(Promise.all(promiseArr));
    });
  });

  return promise;
};

TrackPage.searchThenStarredMode = function() {
  var self = this;
  var idArr = ['3014', '2861', '3015'];
  var promiseArr = idArr.map(function(elem) { return self.find(By.id(elem)); });
  return self.search('wel').then(self.toggleStarredButton.bind(self)).then(self.getElemsDisplayStatus.bind(null, promiseArr));
};

TrackPage.starredModeThenSearch = function() {
  var self = this;
  var idArr = ['3014', '2861', '3015'];
  var promiseArr = idArr.map(function(elem) { return self.find(By.id(elem)); });
  return self.toggleStarredButton().then(self.search.bind(self, 'wel')).then(self.getElemsDisplayStatus.bind(null, promiseArr));
};

TrackPage.filterThenGetTracksNum = function(choice) {
  var self = this;
  console.log(choice);
  if (choice == 'true') {
    console.log("Going inside");
    return self.find(By.className('track-names')).findElements(By.className('track-name')).then(function(elems) {
      return elems[16].click().then(self.getNumTracksVisible.bind(self));
    });
  } else {
    return self.find(By.id('clearFilter')).click().then(self.getNumTracksVisible.bind(self));
  }
};

TrackPage.filterThenSessionStatus = function(choice) {
  var self = this;
  var idArr = ['3014', '3015', '3018', '2938', '2907', '2941'];
  var promiseArr = idArr.map(function(elem) { return self.find(By.id(elem)); });

  if (choice == 'true') {
    console.log("Going inside");
    return self.find(By.className('track-names')).findElements(By.className('track-name')).then(function(elems) {
      return elems[16].click().then(self.getElemsDisplayStatus.bind(null, promiseArr)).then(function(ans) {
        return self.driver.sleep(1000).then(function() {
          return ans;
        });
      });
    });
  } else {
    return self.find(By.id('clearFilter')).click().then(self.getElemsDisplayStatus.bind(null, promiseArr)).then(function(ans) {
      return self.driver.sleep(1000).then(function() {
        return ans;
      });
    });
  }
};

TrackPage.searchThenSessionStatus = function(text) {
  var self = this;
  var idArr = ['3014', '3015', '3018', '2938', '2907', '2941'];
  var promiseArr = idArr.map(function(elem) { return self.find(By.id(elem)); });
  return self.resetSearchBar().then(self.search.bind(self, text)).then(self.getElemsDisplayStatus.bind(null, promiseArr));
};

TrackPage.starredThenSessionStatus = function() {
  var self = this;
  var idArr = ['3014', '3015', '3018', '2938', '2907', '2941'];
  var promiseArr = idArr.map(function(elem) { return self.find(By.id(elem)); });
  return self.toggleStarredButton().then(self.getElemsDisplayStatus.bind(null, promiseArr));
};

TrackPage.getNumTracksVisible = function() {
  var self = this;
  var numPromise = new Promise(function(resolve) {
    self.findAll(By.className('track-filter')).then(function(trackElems) {
      var counter = 0;
      var trackNameArr = [];
      trackElems.forEach(function(trackElem) {
        trackElem.isDisplayed().then(function(val) {
          trackElem.findElement(By.className('text')).getText().then(function(name) {
            if (val && trackNameArr.indexOf(name) == -1) {
              trackNameArr.push(name);
            }
            counter += 1;
            if (counter == trackElems.length) {
              resolve(trackNameArr.length);
            }
          });
        });
      });
    });
  });
  return numPromise;
};

TrackPage.filterCombination = function(steps) {
  var self = this;
  var resultsArr = [];
  var stepObjectFunc = {
    'filter': function() {
      return self.filterThenSessionStatus('true');
    },

    'unfilter': function() {
      return self.filterThenSessionStatus('false');
    },

    'search': function() {
      return self.searchThenSessionStatus('wel');
    },

    'unsearch': function() {
      return self.searchThenSessionStatus('');
    },

    'starred': function() {
      return self.starredThenSessionStatus();
    },

    'unstarred': function() {
      return self.starredThenSessionStatus();
    }

  };

  var serialPromise = function series(arrayOfPromises) {
    var results = [];
    return arrayOfPromises.reduce(function(seriesPromise, promise) {
      return seriesPromise.then(function() {
        return promise
        .then(function(result) {
          results.push(result);
        });
      });
    }, Promise.resolve())
    .then(function() {
      return results;
    });
  };

  var stepsArr = [];
  stepsArr = steps.map(function(step) {
    return stepObjectFunc[step]();
  });

  return serialPromise(stepsArr);
};

module.exports = TrackPage;
