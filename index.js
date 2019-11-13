const Koa = require('koa') 
const render = require('koa-ejs')
const path = require('path')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const session = require('koa-session')
const app = new Koa 

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false
  });

app.keys = ['Love Job, its a secret!'];
app.use(session(app)); 
app.use(cors())

app.use(koaBody({
	multipart: true
}))
app.use(require('./src/route/')) 
app.listen(3000)
