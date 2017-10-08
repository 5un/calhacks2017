const Promise = require('bluebird');
const Language = require('@google-cloud/language');
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
  application_id: "912367c5",
  application_key: "c8d8a438597f9a5b6e2dd24110955f89"
});
Promise.promisifyAll(textapi)

exports.handler = (req, res) => {
  const language = Language({
    projectId: 'mehsurvey-29210',
    keyFilename: './secrets/key.json'
  });

  if(req.method === 'POST') {
    
    const title = req.body.title || ''
    const text = req.body.text || ''

    const document = {
      'content': text,
      type: 'PLAIN_TEXT'
    };

    Promise.all([
      textapi.summarizeAsync({ title, text }),
      language.analyzeEntities({ document: document })
    ]).then((results) => {
      const summarizeResult = results[0]
      const entityResult = results[1][0]
      console.log(summarizeResult)
      console.log(entityResult)
      res.send({
        summarizeResult: summarizeResult,
        entityResult: entityResult
      })
    }).catch((error) => {
      res.send({ error: error })
    })

  } else if(req.method === 'GET') {
    res.status(400).send({ message: 'Method not allowed!' });
  }

}