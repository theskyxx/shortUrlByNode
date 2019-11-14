
const dbControl = require('../../../db')
const fucStd = require('../../fuc/fucstd')

const getHandler = async (ctx) => { 

  let objResult = {}
  objResult.shorUrl = ""
  objResult.errormsg = ctx.session.views || ''
  await ctx.render('home',objResult)
}



const getUrl = async (ctx) => { 
  //console.log('getUrl code = ' + ctx.params.url)
  if (ctx.params.url != 'favicon.ico'){
    originalUrl = await dbControl.getShortUrl(ctx.params.url)
    if (originalUrl != null){
      await ctx.redirect(originalUrl)
    }else{
      await ctx.render('notfound')
    }    
  }

}


const genUrlHandler = async (ctx) => {     // genarate Main Short url
  //console.log(ctx.request.body);
  try {      
      let originUrl = ctx.request.body.originUrl
      ctx.session.views =''
      resultCheckurl = await fucStd.checkUrl(originUrl)
      //console.log('resultCheckurl =>>> '+resultCheckurl)
      if (resultCheckurl == true){
          //console.log('ctx.request.origin '+ ctx.request.origin)
          let randomStr = await fucStd.generateRandomString()
          let objResult = {}
          objResult.shorUrl = ctx.request.origin + '/'+ randomStr
          objResult.originUrl = originUrl

          await dbControl.insetShortUrl(originUrl,randomStr)            
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


module.exports = {
  getHandler,
  genUrlHandler  ,
  getUrl
}