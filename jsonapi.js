var request = require('request');
var fs = require('fs');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var sessionUrl = 'https://open-event-api.herokuapp.com/v1/events/297/sessions?include=track,microlocation,speakers,session-type&fields[track]=id,name&fields[speaker]=id,name&fields[microlocation]=id,name&page[size]=0';
var trackUrl = 'https://open-event-api.herokuapp.com/v1/events/297/tracks?include=sessions&fields[session]=id,title';
var sponsorUrl = 'https://open-event-api.herokuapp.com/v1/events/297/sponsors';
var microUrl = 'https://open-event-api.herokuapp.com/v1/events/297/microlocations';
var eventUrl = 'https://open-event-api.herokuapp.com/v1/events/297?include=social-links,event-copyright';
var speakerUrl = 'https://open-event-api.herokuapp.com/v1/events/297/speakers?include=sessions&fields[session]=id,title';

request.get({url: speakerUrl},
  function(err, response, body) {
    if(err) console.log(err);
    var json = JSON.parse(body);
    new JSONAPIDeserializer().deserialize(json, function(err, data) {
      console.log(data[0]);
      //fs.writeFile('sessions', JSON.stringify(data), 'utf-8', function(err) {
        //if(err) console.log(err);
      //});
    });
  });

//request.get({url: sessionUrl},
  //function(err, response, body) {
    //if(err) console.log(err);
    //var json = JSON.parse(body);
    //new JSONAPIDeserializer().deserialize(json, function(err, data) {
      //console.log(data[0]['speakers']);
      ////fs.writeFile('sessions', JSON.stringify(data), 'utf-8', function(err) {
        ////if(err) console.log(err);
      ////});
    //});
  //});


////request.get({url: trackUrl},
  ////function(err, response, body) {
    ////if(err) console.log(err);
    ////var json = JSON.parse(body);
    ////new JSONAPIDeserializer().deserialize(json, function(err, data) {
      ////console.log(data);
      //////fs.writeFile('tracks', JSON.stringify(data), 'utf-8', function(err) {
        //////if(err) console.log(err);
      //////});
    ////});
  ////});

////request.get({url: sponsorUrl},
  ////function(err, response, body) {
    ////if(err) console.log(err);
    ////var json = JSON.parse(body);
    ////new JSONAPIDeserializer().deserialize(json, function(err, data) {
      ////console.log(data);
      //////fs.writeFile('sponsors', JSON.stringify(data), 'utf-8', function(err) {
        //////if(err) console.log(err);
      //////});
    ////});
  ////});

////request.get({url: microUrl},
  ////function(err, response, body) {
    ////if(err) console.log(err);
    //////console.log(response.headers);
    ////var json = JSON.parse(body);
    //////console.log(json);
    ////new JSONAPIDeserializer().deserialize(json, function(err, data) {
      ////console.log(data);
      //////fs.writeFile('microlocations', JSON.stringify(data), 'utf-8', function(err) {
        //////if(err) console.log(err);
      //////});
    ////});
////});

////request.get({url: 'https://open-event-api.herokuapp.com/v1/events/297?include=social_links,event_copyright'},
  ////function(err, response, body) {
    ////if(err) console.log(err);
    ////var json = JSON.parse(body);
    ////new JSONAPIDeserializer().deserialize(json, function(err, data) {
      ////console.log(data);
      //////fs.writeFile('event', JSON.stringify(data), 'utf-8', function(err) {
        //////if(err) console.log(err);
      //////});
    ////});
  ////});
