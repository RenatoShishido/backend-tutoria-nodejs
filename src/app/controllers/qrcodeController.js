

require("dotenv/config");
const serviceQrCode = require("../../service/qrcodeService");



module.exports = class controllerAuth {
  static async qrcodeUpdateTutoria(req, res) {
    try {
        const response = await serviceQrCode.qrcodeUpdateTutoria(req.params.id, req.body)

        return res.send(response)
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

