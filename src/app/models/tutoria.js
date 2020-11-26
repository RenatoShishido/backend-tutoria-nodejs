const mongoose = require('mongoose')


const TutoriaSchema = new mongoose.Schema({
oferecida: {
  type: Boolean,
  required: true,
},
institution: {
  type: String,
  required: true,
},
discipline: {
  type: String,
  required: true,
},
content: {
  type: String,
  required: true,
},
status: {
  type: String,
  default: "Aguardando"
},
local: {
  type: String
},
qrcode_valido: {
  data_ini: Date,
  data_fim: Date,
  valido: false,
},
agendada: {
  type: Boolean,
  default: false
},
qrcode: {
  type: String
},
data: {
  type: Date
},
tutor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}],
data_cadastro: {
    type: Date,
    default: Date.now(),
},
});



const Tutoria = mongoose.model("Tutoria" , TutoriaSchema)

module.exports = Tutoria;















