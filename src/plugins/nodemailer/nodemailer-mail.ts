import { MailPlugin, SendMailData } from "../mail";
import nodemailer from 'nodemailer';
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1f5734c739370a",
    pass: "4b17466fc5041e"
  }
});

export class NodemailerMailPlugin implements MailPlugin {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    from: 'Equipe Feedget <teste@feedget.com>',
    to: 'Patrick Silva <martins.patrick3@gmail.com>',
    subject,
    html: body,
  })
  }
}