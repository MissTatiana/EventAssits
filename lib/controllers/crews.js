/**
 * crews.js - backend controller 
 * functionality for crews
**/

'use strict';

var mongoose = require('mongoose'),
	Crew = mongoose.model('Crew');


/* Add Crew
------------------------*/
exports.addCrew = function (req, res, next) {
  var newCrew = new Crew(req.body);
  newCrew.provider = 'local';
  newCrew.save(function(err, crew) {
    if (err) 
      return res.json(400, err);
    return res.json(crew);
  });
};

/* Get Specific Crew
---------------------*/
exports.showCrew = function (req, res, next) {
  var crewId = req.params.id;

  Crew.findById(crewId, function (err, crew) {
    if(err) return next(err);
    if(!crew) return res.send(404);

    res.send({ shape: crew.shape });
  });
};

/* Get Crew
---------------------*/
exports.getCrew = function(req, res, $routeParams) {

  return Crew.find( function (err, crew) {
    if (!err) {
      return res.json(crew);
    } else {
      return res.send(err);
    }
  });

};