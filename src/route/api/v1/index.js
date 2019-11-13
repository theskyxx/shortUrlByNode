const Router = require('koa-router')

const genShorturl = require('./genShorturl')  
const controldb = require('../../../db')  
const router = new Router()
 

router.post('/genUrl', genShorturl.genUrlHandler)
 
 
module.exports = router.routes()
