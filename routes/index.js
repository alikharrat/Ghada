var express = require('express');
var router = express.Router();
const dialogflow = require('dialogflow');
/* GET home page. */
createEntityTypes("chatapp-6520a");
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

// /////////////////////////////////////////////////////////////////////////////
// Operations for entity types.
// /////////////////////////////////////////////////////////////////////////////

function createEntityTypes(projectId) {
  // [START dialogflow_create_entity]
  // Imports the Dialogflow library
  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();
  const intentsClient = new dialogflow.IntentsClient();

  // The path to the agent the created entity type belongs to.
  const agentPath = intentsClient.projectAgentPath(projectId);

  const promises = [];

  // Create an entity type named "size", with possible values of small, medium
  // and large and some synonyms.
  const sizeRequest = {
    parent: agentPath,
    entityType: {
      displayName: 'size',
      kind: 'KIND_MAP',
      autoExpansionMode: 'AUTO_EXPANSION_MODE_UNSPECIFIED',
      entities: [
        {value: 'small', synonyms: ['small', 'petit']},
        {value: 'medium', synonyms: ['medium']},
        {value: 'large', synonyms: ['large', 'big']},
      ],
    },
  };
  promises.push(
    entityTypesClient
      .createEntityType(sizeRequest)
      .then(responses => {
        console.log('Created size entity type:');
        logEntityType(responses[0]);
      })
      .catch(err => {
        console.error('Failed to create size entity type:', err);
      })
  );

  // Create an entity of type named "topping", with possible values without
  // synonyms.
  const toppingRequest = {
    parent: agentPath,
    entityType: {
      displayName: 'topping',
      kind: 'KIND_LIST',
      autoExpansionMode: 'AUTO_EXPANSION_MODE_UNSPECIFIED',
      entities: [
        {value: 'tomato', synonyms: ['tomato']},
        {value: 'tuna', synonyms: ['tuna']},
        {value: 'cheddar', synonyms: ['cheddar']},
        {value: 'mushrooms', synonyms: ['mushrooms']},
      ],
    },
  };
  promises.push(
    entityTypesClient
      .createEntityType(toppingRequest)
      .then(responses => {
        console.log('Created topping entity type:');
        logEntityType(responses[0]);
      })
      .catch(err => {
        console.error('Failed to create topping entity type:', err);
      })
  );

  return Promise.all(promises);
  // [END dialogflow_create_entity]
}


module.exports = router;

