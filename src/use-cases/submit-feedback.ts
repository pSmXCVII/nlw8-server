import { MailPlugin } from "../plugins/mail";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailPlugin: MailPlugin,
  ) {}
  
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('O tipo informado está inválido!');
    }
    if(!comment) {
      throw new Error('O comentário informado está inválido!');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Formato da screenshot está inválida!');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailPlugin.sendMail({
      subject: 'Novo feedback',
      body: [
        `<h2 weight="bold">Feedback</h2>`,
        `<div style="font-family: sans-serif; font-size:16px; color: #111">`,
        `<p>Tipo do feedback: ${type}`,
        `<p>Comentário: ${comment}`,
        `<p>Screenshot: ${!screenshot ? 'Nenhuma' : screenshot}`,
        `</div>`
      ].join('\n'),
    })
  }
}