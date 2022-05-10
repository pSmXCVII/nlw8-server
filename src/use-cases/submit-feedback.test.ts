import { SubmitFeedbackUseCase } from "./submit-feedback"

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => {}},
  { sendMail: async () => {}},
)

describe('Submit feedback', () => {
  it('Deve enviar um feedback.', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug report',
    })).resolves.not.toThrow();
  });

  it('Deve enviar o feedback se o tipo da imagem for válida.', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug report',
      screenshot: 'data:image/png;base64,'
    })).resolves.not.toThrow();
  });

  it('Deve apresentar erro se o tipo for inválido.', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'This is a bug report',
      screenshot: 'None'
    })).rejects.toThrow();
  });
  it('Deve apresentar erro se o comentário for inválido.', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'None'
    })).rejects.toThrow();
  });
  it('Deve apresentar erro se a imagem for inválida.', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug report',
      screenshot: 'None'
    })).rejects.toThrow();
  });
})