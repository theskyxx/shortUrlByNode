
const db = require('../../../db')

const getHandler = async (ctx) => { 

  let objResult = {}
  objResult.shorUrl = ""
  objResult.errormsg = ctx.session.views || ''
  await ctx.render('home',objResult)
}



const getUrl = async (ctx) => { 
  //console.log('getUrl code = ' + ctx.params.url)
  if (ctx.params.url != 'favicon.ico'){

    originalUrl = await db.getShortUrl(ctx.params.url)

    if (originalUrl != null){
      await ctx.redirect(originalUrl)
    }else{
      await ctx.render('notfound')
    }
    
  }

}

module.exports = {
  getHandler,
  getUrl
}