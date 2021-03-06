/**
 * Routes.js - Backend Routing
 * Accessed by front end to route to functions in backend controllers
**/

'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    events = require('./controllers/events'),
    segments = require('./controllers/segments'),
    categorys = require('./controllers/categorys'),
    crews = require('./controllers/crews'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  /* THINGS
  -----------------------------*/
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);
  
  /* USERS
  -----------------------------*/
  //Create users - account settings
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);

  //get user by id
  app.route('/api/users/:id')
    .get(users.show);

  /* EVENTS
  -----------------------------*/  
  //get the events for dash
  app.route('/api/getEvents')
    .get(api.getEvents);

  //create event - event settings
  app.route('/api/events')
    .post(events.createEvent)
    .put(events.editEvent)
    .delete(events.deleteEvent);

  app.route('/api/events/me')
    .get(users.me);

  //get event by id
  app.route('/api/events/:id')
    .get(events.showEvent);

  /* SEGMENTS
  ----------------------------*/
  //add segment
  app.route('/api/segments')
    .post(segments.addSegment)
    .put(segments.editSegment)
    .delete(segments.deleteSegment);

  //get event's segment
  app.route('/api/getSegments/:id')
    .get(segments.getSegments);

  //get the segment by id
  app.route('/api/segments/:id')
    .get(segments.showSegment);

  /* CATEGORIES
  ----------------------------*/
  //get the event's categories
  app.route('/api/getCategorys')
    .get(api.getCategorys);

  //create category
  app.route('/api/categorys')
    .post(categorys.createCategory)
    .put(categorys.editCategory)
    .delete(categorys.deleteCategory);

  //get category by id
  app.route('/api/categorys/:id')
    .get(categorys.showCategory);

  /* CREW
  ----------------------------*/
  //add crew member
  app.route('/api/crews')
    .post(crews.addCrew);

  //get the crew
  app.route('/api/getCrew/:id')
    .get(crews.getCrew);

  //get crew by id
  app.route('/api/crews/:id')
    .get(crews.showCrew);

  /* SESSIONS
  ----------------------------*/
  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};