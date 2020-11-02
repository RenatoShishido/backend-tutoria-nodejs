const path = require("path");
const fs = require("fs");

const User = require('../models/user')
const serviceUser = require("../../service/userService");

module.exports = class userController {
  static async findUserAll(req, res) {
    try {
      const user = await serviceUser.findUserAll();

      return res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async findUserId(req, res) {
    try {
      const user = await serviceUser.findUserId(req.params.perfilId);

      return res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async removeUser(req, res) {
    try {
      const user = await serviceUser.removeUser(req.params.id);

      return res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async updateUser(req, res) {
    function deletarAnexo(key) {
      fs.unlink(
        `${path.join(__dirname, "../../../tmp/uploads", key)}`,
        (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
      return "Anexo deletado com sucesso";
    }
    function base64_encode(key) {
      var bitmap = fs.readFileSync("tmp/uploads/" + key + "");
      return new Buffer.from(bitmap).toString("base64");
    }
    try {
      const { nome, email, telefone, rga, semestre } = req.body;
      const id = req.params.id;
      if (req.file === undefined || req.file === null) {

        console.log(req.body);
        const user = await serviceUser.updateUser(id, req.body);

        return res.send({ user });
      } else {
        const { originalname: name, size, filename: key } = req.file;

        const leitura = base64_encode(key);
        const bitmap =
          "data:image/jpeg;image/png;image/pjpeg;base64," + leitura;

        const user = await serviceUser.updateUser(id, {
          nome,
          email,
          telefone,
          rga,
          semestre,
          name,
          size,
          key,
          url: "",
          profile: bitmap,
        });

        deletarAnexo(key);

        return res.send({ user });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
