module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'ZDbC5g1x7y1Vgo3VTiUUYzenbWDWjZzr', // Generated using https://randomkeygen.com/
  JWT_ISSUER: process.env.JWT_ISSUER || 'developer-social/auth-local',
  DB_URL: process.env.DB_URL || 'postgres://:bf123456@localhost/dev-social'
}
