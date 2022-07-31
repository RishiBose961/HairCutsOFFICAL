const {Router} = require('express')
const routes = Router()
const adminController= require('../controller/adminController')

const auth = require('../middleware/auth')


routes.post('/api/auth/registers',adminController.registers)
routes.post('/api/auth/activations', adminController.activate);
routes.post('/api/auth/signings', adminController.signing);
routes.post('/api/auth/access', adminController.access);
routes.post('/api/auth/forgots', adminController.forgot);
routes.post('/api/auth/resets',auth, adminController.reset);
routes.get('/api/auth/users',auth, adminController.info);
routes.patch('/api/auth/user_updates',auth, adminController.update)
routes.get('/api/auth/getallorderhair',auth,adminController.showallorder);
routes.get('/api/auth/getalluser',auth,adminController.getuser);
routes.post('/api/auth/createshop',auth,adminController.createShop);
routes.get('/api/auth/getallshop',auth,adminController.getallshop);
routes.get('/api/auth/getallshopid/:id',auth,adminController.getallshopid);
routes.get('/api/auth/signouts', adminController.signout);



module.exports = routes;