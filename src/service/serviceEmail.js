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
        <body>
        <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
            <h1 style="color:lightblue; center">TUTORIA EM PARES</h1>
            <h2>Envio de email</h2>
            <p><strong>${bodyEmail.content}</strong></p>

            <p>~Seus amigos da Tutoria em Pares</p>
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

