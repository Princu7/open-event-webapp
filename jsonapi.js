var request = require('request');
var fs = require('fs');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var sessionUrl = 'https://api.eventyay.com/v1/events/69/sessions?include=track,microlocation,session-type&fields[track]=id,name&fields[microlocation]=id,name&page[size]=0';
var trackUrl = 'https://api.eventyay.com/v1/events/69/tracks?include=sessions&fields[session]=id,title';
var sponsorUrl = 'https://api.eventyay.com/v1/events/69/sponsors';
var microUrl = 'https://api.eventyay.com/v1/events/69/microlocations';
var eventUrl = 'https://api.eventyay.com/v1/events/69?include=social-links,event-copyright';

request.get({url: sessionUrl},
  function(err, response, body) {
    if(err) console.log(err);
    var json = JSON.parse(body);
    new JSONAPIDeserializer().deserialize(json, function(err, data) {
      fs.writeFile('sessions', JSON.stringify(data), 'utf-8', function(err) {
        if(err) console.log(err);
      });
    });
  });


request.get({url: trackUrl},
  function(err, response, body) {
    if(err) console.log(err);
    var json = JSON.parse(body);
    new JSONAPIDeserializer().deserialize(json, function(err, data) {
      fs.writeFile('tracks', JSON.stringify(data), 'utf-8', function(err) {
        if(err) console.log(err);
      });
    });
  });

request.get({url: sponsorUrl},
  function(err, response, body) {
    if(err) console.log(err);
    var json = JSON.parse(body);
    new JSONAPIDeserializer().deserialize(json, function(err, data) {
      fs.writeFile('sponsors', JSON.stringify(data), 'utf-8', function(err) {
        if(err) console.log(err);
      });
    });
  });

request.get({url: microUrl},
  function(err, response, body) {
    if(err) console.log(err);
    //console.log(response.headers);
    var json = JSON.parse(body);
    //console.log(json);
    new JSONAPIDeserializer().deserialize(json, function(err, data) {
      fs.writeFile('microlocations', JSON.stringify(data), 'utf-8', function(err) {
        if(err) console.log(err);
      });
    });
});

request.get({url: 'https://api.eventyay.com/v1/events/69?include=social_links,event_copyright'},
  function(err, response, body) {
    if(err) console.log(err);
    var json = JSON.parse(body);
    new JSONAPIDeserializer().deserialize(json, function(err, data) {
      fs.writeFile('event', JSON.stringify(data), 'utf-8', function(err) {
        if(err) console.log(err);
      });
    });
  });
