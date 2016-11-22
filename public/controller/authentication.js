var User = require('../../public/model/user');
var Joi = require('joi');

exports.login = {
    handler: function (request, reply) {
	var mail = request.payload.email;
	var pass = request.payload.password;
	User.authenticate()(mail, pass, function (err, user) {
	    if (err) {
		return reply.redirect('/login');
	    }
	    if (user) {
		request.auth.session.set(user);
		return reply.redirect('/home');
	  }
	    return reply.redirect('/login');
	});
    }
};

exports.logout = {
    auth: 'session',
    handler: function (request, reply) {
	request.auth.session.clear();
	return reply('Logout Successfully').redirect('/');
    }
};

exports.register = {
    validate: {
	payload: {
	    email: Joi.string().email().required(),
	    password: Joi.string().min(2).required()
	}
  },
  handler: function(request, reply) {
      var Userinfo = new User({
	  email: request.payload.email
      });
      var pass = request.payload.password;
      User.register(Userinfo, pass, function(err, user) {
	  if (err) {
              return reply(err);
	  }
	  return reply.redirect('/login');
      });
  }
};
