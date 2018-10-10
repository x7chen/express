var express = require('express');
var router = express.Router();
var tls = require('../controller/tlsServer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET get_sigid. */
router.get('/get_sigid/', function(req, res, next) {
    
    res.send(tls.getSigId(req.query.id));
    
});
/* GET get_sigid. */
router.get('/get_sigid/:id', function(req, res, next) {
    
    res.send(tls.getSigId(req.param.id));
    
});

module.exports = router;