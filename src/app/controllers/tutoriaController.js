const serviceTutoria = require("../../service/tutoriaService");

module.exports = class tutoriaController {
  static async findTutoria(req, res) {
    try {
      const tutorias = await serviceTutoria.findTutoria();

      return res.send({ tutorias });
    } catch (err) {
      return res.status(500).send(error);
    }
  }
  static async findTutoriaOferecida(req, res) {
    try {
      const tutorias = await serviceTutoria.findTutoriaOferecida();

      return res.send({ tutorias });
    } catch (err) {
      return res.status(500).send(error);
    }
  }
  static async findTutoriaId(req, res) {
    try {
      const tutorias = await serviceTutoria.findTutoriaId(req.params.tutoriaId);

      return res.send({ tutorias });
    } catch (err) {
      return res.status(500).send(error);
    }
  }
  static async createTutoria(req, res) {
    try {
      var tutorias;
      const { data, oferecida, institution, discipline, content } = req.body;

      if (!oferecida && !institution && !discipline && !content) {
        return res.status(400).send("Necessario preencher os dados");
      }
      if (!institution) {
        return res.status(400).send("Necessario colocar o bloco");
      }
      if (!discipline) {
        return res.status(400).send("Necessario colocar a disciplina");
      }
      if (!content) {
        return res.status(400).send("Necessario colocar o conteudo");
      }
      if (oferecida === "" || oferecida === undefined || oferecida === null) {
        return res.status(400).send("Necessario selecionar o modo no SELECT");
      }

      const userId = req.userId

      if (oferecida) {
        const status = "AguardandoAluno";
        tutorias = await serviceTutoria.createTutoria({
          data,
          oferecida,
          status,
          institution,
          discipline,
          content,
          userId
        });
      } else {
        tutorias = await serviceTutoria.createTutoria({
          oferecida,
          institution,
          discipline,
          content,
          userId
        });
      }

      if (!tutorias) res.status(400).send("Falha ao criar uma tutoria");

      return res.send({ tutorias });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  static async updateTutoriaAluno(req, res) {
    try {
      const tutoria = await serviceTutoria.validaNovoAluno(req);
      return res.send({ tutoria });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  static async updateTutoria(req, res) {
    try {
      const tutorias = await serviceTutoria.updateTutoria(
        req.params.tutoriaId,
        req.body
      );
      return res.send({ tutorias });
    } catch (err) {
      return res.status(500).send(error);
    }
  }
  static async removeTutoria(req, res) {
    try {
      const tutoria = await serviceTutoria.removeTutoriaId(
        req.params.tutoriaId
      );

      return res.send(tutoria);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  static async paginationTutoria(req, res) {
    try {
      const paginas = await serviceTutoria.paginationTutoria(req.params.pageId);

      return res.send(paginas);
    } catch (err) {
      res.status(500).send(error);
    }
  }
  static async paginationTutoriaAgendado(req, res) {
    try {
      const paginas = await serviceTutoria.paginationTutoriaAgendado(
        req.params.pageId
      );

      return res.send(paginas);
    } catch (err) {
      res.status(500).send(error);
    }
  }
  static async searchTutoria(req, res) {
    try {
      const data = await serviceTutoria.searchTutoria(req.params.Id);

      return res.send({ data });
    } catch (err) {
      res.status(500).send(error);
    }
  }
};
