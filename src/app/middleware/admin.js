const serviceUser = require('../../service/userService')
module.exports = middleware => {
  return async (req, res, next) => {
    const user = await serviceUser.getUserId(req.userId)
    if(user.is_admin)
      middleware(req, res, next)
    else
      res.status(400).send({error: "Precisar ser administrador"})
  }
}