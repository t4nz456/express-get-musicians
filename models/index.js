const Band = require('./Band')
const Musician = require('./Musician')

Musician.hasOne(Band, {
    foreignKey: 'musicianId',
  });
  
  Band.hasMany(Musician, {
    foreignKey: 'bandId',
  });

module.exports = {
    Band,
    Musician
};
