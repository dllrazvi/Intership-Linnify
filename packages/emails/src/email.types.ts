export type EmailData = {
  to: string | string[];
  subject: string;
  template: EmailTemplate;
  data: Record<string, unknown>;
};

export enum EmailTemplate {
  TEST_TEMPLATE,
  LOGIN_CODE
}
