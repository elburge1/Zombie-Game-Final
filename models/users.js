var knex = require('../db/knex');

module.exports = {
  addUser: function (profile) {
    var f_name = profile.displayName.split(' ')[0];
    var l_name = profile.displayName.split(' ')[1];
    return knex('zombie_users').insert({
      f_name: f_name,
      l_name: l_name,
      provider: profile.provider,
      email: profile.email,
      fb_id: profile.id,
      pic_url: profile.picUrl,
    })
  }
}
