const urlExists = require('url-exists');
const dbControl = require('../../../db')


const genUrlHandler = async (ctx) => {     // genarate Main Short url
    //console.log(ctx.request.body);
    try {      
        let originUrl = ctx.request.body.originUrl
        ctx.session.views =''

        resultCheckurl = await checkUrl(originUrl)
        //console.log('resultCheckurl =>>> '+resultCheckurl)
        if (resultCheckurl == true){
            //console.log('ctx.request.origin '+ ctx.request.origin)
            let randomStr = generateRandomString()
            let objResult = {}
            objResult.shorUrl = ctx.request.origin + '/'+ randomStr
            dbControl.insetShortUrl(originUrl,randomStr)            
            await ctx.render('afterGenarate',objResult)            
        }else{            

            var pattern = new RegExp('^(https?)://');
            if(!pattern.test(originUrl)) {
                ctx.session.views ='Invalid URL Start from http or https'
            }
            else{
                ctx.session.views ='Invalid URL '
            }
            
            ctx.redirect('/')                        
        }
                        
    } catch (err) {
        console.error(err);
    }
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


module.exports = {
    genUrlHandler
}