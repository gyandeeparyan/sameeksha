import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>Welcome to Sameeksha!</title>
        <Font
          fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>Welcome to Sameeksha! Your verification code inside.</Preview>
      <Section>
        <Row>
          <Heading as='h2'>Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            We are thrilled to have you join the Sameeksha community! 🌟 To get
            started, please use the verification code below to complete your
            registration:
          </Text>
        </Row>
        <Row>
          <Text
            style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>
            {otp}
          </Text>
        </Row>
        <Row>
          <Text>Yeh code app mein enter karke apna account verify karein.</Text>
        </Row>
        <Row>
          <Text>
            Apne vichaar rakhein bina kisi sankoch ke! Agar aapne yeh code
            request nahi kiya, toh chinta na karein! Is email ko ignore karein
            aur agar koi dikkat ho toh hamari support team se sampark karein.
          </Text>
        </Row>
        <Row>
          <Text>
            We are here to help you foster open communication and constructive
            dialogue.
          </Text>
        </Row>
        <Row>
          <Text>Welcome aboard, and happy connecting!</Text>
        </Row>
        <Row>
          <Text>Warm regards,</Text>
        </Row>
        <Row>
          <Text>Sameeksha</Text>
        </Row>
      </Section>
    </Html>
  );
}
