var _ = require('underscore'),
    config = require('../config'),
    db = require('../lib/db'),
    Promise = require('promise');


// Builds an object representation of a row in the DB `pull_labels` table
// from the data returned by GitHub's API.
function DBLabel(label) {
   this.data = {
      number: label.data.number,
      title: label.data.title,
      repo_name: config.repo.name,
   };
}

DBLabel.prototype.save = function() {
   console.log('saving label: ', this.data);
   var pullData = this.data;
   var q_update = 'REPLACE INTO pull_labels SET ?';

   return new Promise(function(resolve, reject) {
      db.query(q_update, pullData, function(err, rows) {
         if (err) { reject(err); }
         resolve();
      });
   });
};

DBLabel.prototype.delete = function() {
   console.log('deleteing label: ', this.data);
   var pullData = this.data;
   var q_update = 'DELETE FROM pull_labels WHERE ' +
    'number = ? AND title = ? AND repo_name = ?';

   return new Promise(function(resolve, reject) {
      db.query(q_update, [pullData.number, pullData.title, pullData.repo_name],
       function(err, rows) {
         if (err) { reject(err); }
         resolve();
      });
   });
};

module.exports = DBLabel;