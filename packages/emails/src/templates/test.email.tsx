import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

type TestEmailProps = {
  data: string;
};

const TestEmail = (content: TestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>This is a preview</Preview>
      <Tailwind>
        <Head />
        <Body className={'mx-auto my-auto bg-white font-sans'}>
          <Container className="mx-auto my-4 w-full max-w-[600px] px-4 md:px-0">
            <Section>
              <Text className={'text-xl font-semibold leading-[22px] text-black'}>Hi 👋</Text>
              <Text className={'text-xl font-semibold leading-[22px] text-black'}>
                This is a test email template.
              </Text>
            </Section>

            <Text className={'leading-[20px]'}>Some description content here. {content.data}</Text>

            <Hr className="mx-0 w-full border border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

TestEmail.PreviewProps = {
  data: '1234'
} as TestEmailProps;

export default TestEmail;
