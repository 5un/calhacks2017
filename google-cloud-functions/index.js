const summarizeText = require('./handlers/summarize-text');
const saveReadings = require('./handlers/save-readings')

const handleCORS = (req, res, next) => {
  if (req.method === `OPTIONS`) {
    res.set('Access-Control-Allow-Origin', "*")
     .set('Access-Control-Allow-Methods', 'GET, POST')
     .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
     .status(200).send({});
  } else {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    next(req, res)
  }
}

exports.summarizeText = (req, res) => {
  console.log(summarizeText);
  console.log(summarizeText.handler);
  handleCORS(req, res, summarizeText.handler);
};

exports.saveReadings = (req, res) => {
  handleCORS(req, res, saveReadings.handler);
};


