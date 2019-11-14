const Router = require('koa-router')
const router = new Router()
   
  
router.use(require('./controller'))

module.exports = router.routes()
