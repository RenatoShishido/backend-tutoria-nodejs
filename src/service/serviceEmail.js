require("dotenv/config")
const sgMail = require('@sendgrid/mail');
module.exports = class EmailService {
  static async sendEmail(bodyEmail){
    try{
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: 'progrenato@gmail.com',
        from: bodyEmail.email,
        subject: bodyEmail.assunto,
        html: `<html >
        <head>
        </head>
        <style>
          .bloco {
            padding: 100px;
            width: 50%;
            border: 1px solid black;
            border-radius: 10px;
          }
          .center {
            text-align: center;
          }
          .color {
            color: aqua;
          }
        </style>
        <body>
          <div class="bloco">
            <h1 class="color center">TUTORIA EM PARES</h1>
            <h2 class="center">Envio de email</h2>
            <p><strong>${bodyEmail.content}</strong></p>
          
            <p>~Seus amigos da Tutoria em Pares</p>
          </div>
        
        </body>
        </html>
        `,
      };

      let email = await sgMail.send(msg)
      return email ? {data: "Email enviado com Sucesso!", status: 200}
      : {data: "Falha ao enviar email", status: 500}
    } catch (err){
      console.log(err)
      throw{
        data:'Falha ao enviar email!!',
        status: 500
      }
    }
  }
}

