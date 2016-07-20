var passport = require('passport');
var users = require('./models/users');
var rp = require('request-promise');

passport.authCallback = function (accessToken, refreshToken, profile, done) {
  console.log('profile', profile);
  users.getByFacebookId(profile.id)
  .then(function (user) {
    if (!user) {
      rp({
        uri: `https://graph.facebook.com/me?access_token=${accessToken}&fields=picture.type(small)`,
        json: true,
      }).catch(function () {
        profile.picUrl = null;
      }).then(function (fbInfo) {
        profile.picUrl = fbInfo.picture.data.url;
        users.addUser(profile)
        .then(function (user) {
          done(null, user)//{id: profile.id, displayName: profile.displayName, accessToken: accessToken, picUrl: profile.picUrl});
        });
      });
    } else {
      done(null, user)//{id: profile.id, displayName: profile.displayName, accessToken: accessToken, picUrl: profile.picUrl});
    }
  });
};

module.exports = passport;
