var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body)
  res.render('index', { title: 'Express' });
});
router.post('/Send_Message',function(req,res){
  console.log(req.body);
  switch(req.body.result.parameters.echoText) {
    case "Bonjour":
        speech="sbe7 elfol";
        break;
    case "Ali":
        speech="yzzi blé bléda";
        break;
    default:
        speech="i7chim";
}

  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
})

module.exports = router;
