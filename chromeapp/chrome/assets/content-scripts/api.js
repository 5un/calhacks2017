(function(window) {
  var APIURL = 'https://us-central1-mehsurvey-29210.cloudfunctions.net'
  var chapi = {
    summarizeText: function(title, text, cb) {
      $.post(APIURL + '/summarizeText', { text: text, title: title }, function(data) {
        cb(null, data)
      });

    }
  };
  window.chapi = chapi;
})(window);