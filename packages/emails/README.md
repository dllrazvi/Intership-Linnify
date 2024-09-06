# `@repo/emails`

`@repo/emails` is a package that provides email functionality for our applications.

### Environment Variables

The package is using the following env variables

- EMAIL_FROM_ADDRESS (default: `Linnify Starter <no-reply@email.linnify.ro>`)
- EMAIL_DISABLED (optional, default `false`)
- RESEND_API_KEY (optional)

If `EMAIL_DISABLED` is set to `true` or `RESEND_API_KEY` is not defined, the emails will not be sent.

### Usage

```typescript
import emailService from '@repo/emails';

await emailService.sendEmail({
  to: email,
  subject: 'Your subject goes here',
  template: EmailTemplate.TEST_TEMPLATE,
  data: {}
});
```
