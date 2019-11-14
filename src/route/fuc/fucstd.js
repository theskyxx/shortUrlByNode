const urlExists = require('url-exists')

function checkUrl(url) { //check domin exists 
    return new Promise((resolve, reject) => {
        let result = false ;
         urlExists(url, function(err, exists) {
            if (exists) {                 
                //console.log('good genHeader');
                result = true                
            } else {                
                //console.log('bad genHeader');
                result = false                
             }
             resolve(result)
          });       
    });
  }

  function generateRandomString() { //gen Short Url
    var length = 6,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
    }

    
  module.exports = {
    checkUrl,
    generateRandomString
  }