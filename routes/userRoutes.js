const {Router} = require('express')
const route = Router()
const userController= require('../controller/userController')
const adminController= require('../controller/adminController')
const auth = require('../middleware/auth')


route.post('/api/auth/register',userController.register)
route.post('/api/auth/activation', userController.activate);
route.post('/api/auth/signing', userController.signing);
route.post('/api/auth/access', userController.access);
route.post('/api/auth/forgot', userController.forgot);
route.post('/api/auth/reset',auth, userController.reset);
route.get('/api/auth/user',auth, userController.info);
route.patch('/api/auth/user_update',auth, userController.update);
route.post('/api/auth/createhair',auth,userController.createhair)
route.get('/api/auth/getorderhair',auth,userController.myhairorder)
route.get('/api/auth/getallshopid/:id',auth,adminController.getallshopid);
route.get('/api/auth/getShopid/',userController.getShopId)
route.get('/api/auth/alluser',userController.allUsers)
route.get('/api/auth/signout', userController.signout);



module.exports = route;