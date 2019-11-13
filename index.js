const Koa = require('koa') 
const render = require('koa-ejs')
const path = require('path')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const session = require('koa-session')
const protect = require('koa-protect')  
const ratelimit = require('koa-ratelimit')
const redis = require('redis')
const client = redis.createClient()  
const app = new Koa 

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false
  });

app.keys = ['Love Job, its a secret!']
app.use(session(app))
app.use(cors()) 

app.use(protect.koa.sqlInjection({  
  body: true,  
  loggerFunction: console.error  
}))  

app.use(protect.koa.xss({  
  body: true,  
  loggerFunction: console.error  
}))  

app.use(ratelimit({  
  db: client,  
  duration: 60000,  
  errorMessage: 'Sometimes You Just Have to Slow Down.',  
  id: (ctx) => ctx.ip,  
  headers: {  
      remaining: 'Rate-Limit-Remaining',  
      reset: 'Rate-Limit-Reset',  
      total: 'Rate-Limit-Total'  
  },  
  max: 100  
}))
app.use(koaBody({
	multipart: true
}))
app.use(require('./src/route/')) 
app.listen(3000)

