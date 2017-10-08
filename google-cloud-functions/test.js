const Promise = require('bluebird');
const Language = require('@google-cloud/language');
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
  application_id: "912367c5",
  application_key: "c8d8a438597f9a5b6e2dd24110955f89"
});

Promise.promisifyAll(textapi)

const language = Language({
  projectId: 'mehsurvey-29210',
  keyFilename: './secrets/key.json'
});

const body = {
  "title": "Promise promisify",
  "text": "Returns a function that will wrap the given nodeFunction. Instead of taking a callback, the returned function will return a promise whose fate is decided by the callback behavior of the given node function. The node function should conform to node.js convention of accepting a callback as last argument and calling that callback with error as the first argument and success value on the second argument. If the nodeFunction calls its callback with multiple success values, the fulfillment value will be the first fulfillment item. Setting multiArgs to true means the resulting promise will always fulfill with an array of the callback's success value(s). This is needed because promises only support a single success value while some callback API's have multiple success value. The default is to ignore all but the first success value of a callback function. If you pass a context, the nodeFunction will be called as a method on the context. Example of promisifying the asynchronous readFile of node.js fs-module:"
}

const document = {
  'content': body.text,
  type: 'PLAIN_TEXT'
};

Promise.all([
  textapi.summarizeAsync({ title: body.title, text: body.text }),
  language.analyzeEntities({ document: document })
]).then((results) => {
  const summarizeResult = results[0]
  const entityResult = results[1][0]
  console.log(summarizeResult)
  console.log(entityResult)
}).catch((error) => {
  console.error(error);
})


// textapi.summarize({
//   'title': body.title,
//   'text': body.text
// }, function(error, response) {
//   if (error === null) {
//     console.log(response);
//   } else {
//     console.error(error);
//   }
// });

// textapi.summarizeAsync({
//   'title': body.title,
//   'text': body.text
// }).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error(error);
// });

// summarize({
//   'title': body.title,
//   'text': body.text
// }).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error(error);
// });