import { render } from '@react-email/components';
import chunk from 'lodash.chunk';
import { Resend } from 'resend';

import { EmailData, EmailTemplate } from './email.types';
import TestEmail from './templates/test.email';

const TEMPLATES = {
  [EmailTemplate.TEST_TEMPLATE]: TestEmail
} as const;

class EmailService {
  private client: Resend | null = null;

  get isDisabled(): boolean {
    return process.env.EMAIL_DISABLED === 'true' || !process.env.RESEND_API_KEY;
  }

  get from(): string {
    return process.env.EMAIL_FROM_ADDRESS ?? 'Linnify Starter <no-reply@email.linnify.ro>';
  }

  getClient(): Resend {
    if (!this.client) {
      this.client = new Resend(process.env.RESEND_API_KEY);
    }
    return this.client;
  }

  async sendEmail(data: EmailData): Promise<void> {
    if (this.isDisabled) {
      console.log('Email sending is disabled');
      return;
    }

    const content = this.getHTMLContent(data.template, data.data);

    try {
      const client = this.getClient();
      await client.emails.send({
        from: this.from,
        to: Array.isArray(data.to) ? data.to : [data.to],
        subject: data.subject,
        html: content
      });
    } catch (e) {
      console.warn(`Failed to send email to ${data.to}`);
      throw e;
    }
  }

  async sendBatchEmail(data: EmailData & { to: string[] }): Promise<void> {
    if (this.isDisabled) {
      console.log('Email sending is disabled');
      return;
    }

    const client = this.getClient();
    const content = this.getHTMLContent(data.template, data.data);
    const emails = data.to.map((to) => ({
      from: this.from,
      to: to,
      subject: data.subject,
      html: content
    }));
    const chunks = chunk(emails, 100);

    const results = await Promise.allSettled(chunks.map((chunk) => client.batch.send(chunk)));

    results.forEach((result) => {
      if (result.status === 'rejected') {
        console.warn('Error on sending the email', {
          error: result.reason
        });
        return;
      }

      if (result.value === null) {
        console.warn(`Failed to send "${data.subject}" email`);
        return;
      }
    });
  }

  private getHTMLContent(template: EmailTemplate, data: Record<string, unknown>): string {
    const component = TEMPLATES[template];
    return render(component(data as any));
  }
}

export const emailService = new EmailService();
