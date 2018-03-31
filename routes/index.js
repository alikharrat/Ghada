var express = require('express');
var router = express.Router();
const dialogflow = require('dialogflow');
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

// /////////////////////////////////////////////////////////////////////////////
// Operations for entity types.
// /////////////////////////////////////////////////////////////////////////////

function createEntityTypes(projectId) {
  // [START dialogflow_create_entity]
  // Imports the Dialogflow library
  // Instantiates clients
  console.log('je suis là')
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
      displayName: 'size2',
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

function logEntityType(entityType) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates client.
  const entityTypesClient = new dialogflow.EntityTypesClient();

  console.log(
    '  ID:',
    entityTypesClient.matchEntityTypeFromEntityTypeName(entityType.name)
  );
  console.log('  Display Name:', entityType.displayName);
  console.log(
    '  Auto expansion:',
    entityType.autoExpansionMode === 'AUTO_EXPANSION_MODE_DEFAULT'
  );
  if (!entityType.entities) {
    console.log('  No entity defined.');
  } else {
    console.log('  Entities: ');
    entityType.entities.forEach(entity => {
      if (entityType.kind === 'KIND_MAP') {
        console.log(`    ${entity.value}: ${entity.synonyms.join(', ')}`);
      } else {
        console.log(`    ${entity.value}`);
      }
    });
  }
  console.log('');
}

  return Promise.all(promises);
  // [END dialogflow_create_entity]
}


module.exports = router;
