const Router = require('koa-router')
const home = require('./home')

const router = new Router() 

router.get('/', home.getHandler) 
router.post('/createUrl', home.genUrlHandler) 
router.get('/:url', home.getUrl) 

module.exports = router.routes()