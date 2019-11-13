const Router = require('koa-router')

const home = require('./home')

const router = new Router() 

router.get('/', home.getHandler) 
router.get('/:url', home.getUrl) 

module.exports = router.routes()