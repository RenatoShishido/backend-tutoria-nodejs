const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

require("dotenv/config");
const serviceUser = require("../../service/userService");
const servicePassword = require("../../service/servicePassword");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  });
}

module.exports = class controllerAuth {
  static async registerAuth(req, res) {
    var { email } = req.body;
    try {
      if (await serviceUser.findUserOne(email))
        return res.status(400).send("Email ja cadastrado");
      else if (!req.body.email && !req.body.nome && !req.body.password)
        return res.status(400).send("Necessario preencher os dados");
      else if (
        !req.body.nome ||
        typeof req.body.nome == undefined ||
        req.body.nome == null
      ) {
        return res.status(400).send("Nome invalido");
      } else if (
        !req.body.email ||
        typeof req.body.email == undefined ||
        req.body.email == null
      ) {
        return res.status(400).send("Email invalido");
      } else if (
        !req.body.password ||
        typeof req.body.password == undefined ||
        req.body.password == null
      ) {
        return res.status(400).send("Password invalida");
      }

      const palavra = req.body.email.split(/[.@]/gi);
      if (palavra[2] !== "ufms" && palavra[3] !== "br")
        return res
          .status(400)
          .send("Email invalido, o email precisa ser institucional");

      const user = await serviceUser.createUser(req.body);

      user.password = undefined;
      

      return res.send({
        user,
        token: generateToken({
          id: user._id,
        }),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
  static async authenticate(req, res) {
    const { email, password } = req.body;
    try {
      const user = await serviceUser.findUserOne(email);

      if (!user) return res.status(400).send("Usuario invalido");

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send("Senha invalida");

        user.password = undefined;

      res.send({
        user,
        token: generateToken({
          id: user._id,
        }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await serviceUser.findUserOne(email);

      if (!user) res.status(400).send("Email invalido");

      const token = crypto.randomBytes(3).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await serviceUser.updateUser(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      user.password = undefined;
      try {
        const sgEmail = await servicePassword.sendEmail(token, email);

        return res.send({ sgEmail });
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Erro ao tentar enviar o email" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await serviceUser.findUserToken(email);


      if (!user)
        res.status(400).send("Email invalido")

      if (token !== user.passwordResetToken)
        res.status(400).send("Token invalido")

      const now = new Date();

      if (now > user.passwordResetExpires)
        res.status(400).send("Token expirado")

      user.password = password;

      await user.save();

      res.send("Password alterada com sucesso!");
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

