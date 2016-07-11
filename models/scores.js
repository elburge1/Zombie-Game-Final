var knex = require('../db/knex');

module.exports = {
  addScore: function(user_id, score){
    return knex('user_scores').insert({
      user_id: user_id,
      score: score,
    });
  },
  getAllScores: function(){
    return knex('user_scores');
  },
  getTopScores: function(){
    return knex('user_scores').orderBy('score', 'desc');
  }
}
