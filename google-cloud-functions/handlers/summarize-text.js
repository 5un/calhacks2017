var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "912367c5",
  application_key: "c8d8a438597f9a5b6e2dd24110955f89"
});

exports.handler = (req, res) => {

  if(req.method === 'POST') {
    textapi.summarize({
      'title': req.body.title,
      'text': req.body.text
    }, function(error, response) {
      if (error === null) {
        res.send(response);
      } else {
        res.send({ error });
      }
    });

  } else if(req.method === 'GET') {
    res.status(400).send({ message: 'Method not allowed!' });
  }

}