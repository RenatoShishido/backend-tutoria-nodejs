const { populate } = require("../app/models/tutoria");
const Tutoria = require("../app/models/tutoria");
const User = require("../app/models/user");
const qr = require("qrcode");
module.exports = class tutoriaService {
  static async findTutoriaAll() {
    try {
      return await Tutoria.find()
      .populate({path: 'user'})
      .populate({path: 'tutor'})
    
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> findTutoriaAll <<${error}>>`
      );
      throw {
        error: "Nao foi possivel listar todas as tutorias",
      };
    }
  }
  static async findTutoria() {
    try {
      return await Tutoria.find()
      .where("oferecida", false)
      .populate({path: 'user'})
      .populate({path: 'tutor'})
    
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> findTutoria <<${error}>>`
      );
      throw {
        error: "Nao foi possivel listar as tutorias não oferecidas",
      };
    }
  }
  static async findTutoriaOferecida() {
    try {
      return await Tutoria.find()
        .where("status")
        .equals("AguardandoAluno")
        .where("oferecida", true)
        .populate({path: 'user'})
        .populate({path: 'tutor'})
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> findTutoriaOferecida <<${error}>>`
      );
      throw {
        error: "Nao foi possivel listar as tutorias oferecidas",
      };
    }
  }
  static async findTutoriaId(id) {
    try {
      return await Tutoria.findById(id)
                      .populate({path: 'user'})
                      .populate({path: 'tutor'})

    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> findTutoriaId <<${error}>>`
      );
      throw {
        error: "Nao foi possivel listar uma tutoria",
      };
    }
  }
  static async createTutoria(
    { data, oferecida, status, institution, discipline, content, userId }
  ) {
    try {
      if (status === "AguardandoAluno") {
        return await Tutoria.create({
          data,
          oferecida,
          status,
          institution,
          discipline,
          content,
          tutor: userId,
        });
      } else {
        return await Tutoria.create({
          oferecida,
          institution,
          discipline,
          content,
          user: userId,
        });
      }
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> createTutoria <<${error}>>`
      );
      throw {
        error: "Nao foi possivel criar uma tutoria",
      };
    }
  }
  static async removeTutoriaId(id) {
    try {
      return await Tutoria.findByIdAndRemove(id);
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> removeTutoriaId <<${error}>>`
      );
      throw {
        error: "Nao foi possivel remover uma tutoria",
      };
    }
  }
  static async validaNovoAluno(req, res) {
    try {
      const tutoria = await Tutoria.findById(req.params.tutoriaId);
      const aluno = await User.findById(req.userId);
      var existe = tutoria.users.includes(aluno._id);

      if (!existe) {
        await tutoria.users.push(aluno);

        if (tutoria.users.length === 10) {
          tutoria.status = "AgendadoAluno";
        }

        await tutoria.save();

        return tutoria;
      } else {
        throw {
          error: "Aluno já incluído à tutoria",
        };
      }
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> validaNovoAluno <<${error}>>`
      );
      throw {
        error: "Nao foi possivel atualizar uma tutoria de aluno",
      };
    }
  }
  static async updateTutoria(id, content) {
    try {
      if(content.local === undefined){
        return await Tutoria.findByIdAndUpdate(id, content);
      }else {
        const lista = {
          tutoriaId: content._id,
          alunoId: content.user._id,
          tutorId: content.tutor._id
        }
        
        const listaString = JSON.stringify(lista)

        qr.toDataURL(listaString, async (err, src) => {
          if (err) throw "Occoreu um erro ao fazer o QR Code"
  
          content.qrcode = src
  
          return  await Tutoria.findByIdAndUpdate(id, content)
        });
      }
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> updateTutoria <<${error}>>`
      );
      throw {
        error: "Nao foi possivel atualizar uma tutoria",
      };
    }
  }
  static async paginationTutoria(page) {
    const limit = 10;
    try {
      const count = await Tutoria.find()
        .where("status")
        .equals("Aguardando")
        .count();

      const data = await Tutoria.find()
        .select({})
        .where("status")
        .equals("Aguardando")
        .limit(limit)
        .skip(page * limit - limit)
        .populate({path: 'user'})
        .populate({path: 'tutor'})

      return { count, data };
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> paginationTutoria <<${error}>>`
      );
      throw {
        error: "Não foi possivel utilizar a paginação",
      };
    }
  }
  static async paginationTutoriaAgendado(page) {
    const limit = 10;
    try {
      const count = await Tutoria.find()
        .where("status")
        .equals("Agendado")
        .count();

      const data = await Tutoria.find()
        .select({})
        .where("status")
        .equals("Agendado")
        .limit(limit)
        .skip(page * limit - limit)
        .populate({path: 'user'})
        .populate({path: 'tutor'})

      return { data, count };
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> paginationTutoriaAgendado <<${error}>>`
      );
      throw {
        error: "Não foi possivel utilizar a paginação dos agendados",
      };
    }
  }
  static async searchTutoria(id) {
    try {
      return await Tutoria.findById(id).populate({path: 'user'})
                          .populate({path: 'tutor'})
    } catch (error) {
      console.log(
        `/services/tutoriaService: error -> searchTutoria <<${error}>>`
      );
      throw {
        error: "Não foi possivel pesquisar por uma tutoria",
      };
    }
  }
};
