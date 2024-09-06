import Resend from 'next-auth/providers/resend';

import { EmailTemplate, emailService } from '@repo/emails';

function generateAuthCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export default Resend({
  name: 'Email',
  normalizeIdentifier: (identifier) => identifier.toLowerCase().trim(),
  generateVerificationToken: async () => generateAuthCode(),
  sendVerificationRequest: async ({ identifier: to, url, token, provider }) => {
    console.log('TOKEN IS: ', token);
    await emailService.sendEmail({
      to,
      subject: `${token} is your verification code`,
      template: EmailTemplate.LOGIN_CODE,
      data: {
        code: token
      }
    });
  }
});
