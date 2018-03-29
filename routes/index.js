var express = require('express');
var router = express.Router();
/* GET home page. */
createEntityTypes("heroic-artifact-160907");
router.get('/', function(req, res, next) {
  console.log(req.body)
  res.render('index', { title: 'Express' });
});
router.post('/Send_Message',function(req,res){
  console.log(req.body);

  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
})


module.exports = router;

