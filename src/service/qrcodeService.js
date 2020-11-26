const Tutoria = require("../app/models/tutoria");
module.exports = class tutoriaService {
  static async qrcodeUpdateTutoria(id, content) {
    try {
      return await Tutoria.findByIdAndUpdate(id, content)
    
    } catch (error) {
      console.log(
        `/services/qrcodeService: error -> qrcodeUpdateTutoria <<${error}>>`
      );
      throw {
        error: "Nao foi possivel Scannear essa tutoria",
      };
    }
  }
};
