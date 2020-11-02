const serviceEmail = require("../../service/serviceEmail");

module.exports = class controllerEmail {
  static async sendEmail(req, res) {
    try {
      if (!req.body)
        res.status(400).send({
          error: "Email obrigatorio",
        });

      const email = await serviceEmail.sendEmail(req.body);
      return res.send({ email });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Erro ao tentar enviar o email" });
    }
  }
};
