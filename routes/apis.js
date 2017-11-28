var express = require('express');
var Sequelize   = require('sequelize');
var router = express.Router();

var DB_CONFIG = {
  name: 'DCT_Information',
  user: 'dctAdmin',
  pass: '1qaz2wsx',
  ip: '13.115.209.4',
  port: '3306'
};

function setupDBServer(res) {
  if (!DB_CONFIG) return;
  var sequelize = new Sequelize('mariadb://' + DB_CONFIG.user + ':'
    + DB_CONFIG.pass + '@' + DB_CONFIG.ip + ':' + DB_CONFIG.port + '/' + DB_CONFIG.name);
  return sequelize;
}

router.get('/testApis', (req, res, next) => {
  var sequelize = setupDBServer(res);
  if (!sequelize) res.status(400).json({msg: "Bad Request"});

  sequelize.query('SELECT * FROM testTable;')
  .then((response) => {
    res.status(200).json(response);
  })
  .error((error) => {
    console.log(error);
    res.status(400).json(error);
  })
})
