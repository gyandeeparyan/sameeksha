import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Container,
  Text,
  Button,
  Img,
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
    <Html>
      <Head>
        <title>Welcome to Sameeksha!</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Welcome to Sameeksha! Your verification code inside.</Preview>

      <Section style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={logoSection}>
            <Text style={logo}>Sameeksha</Text>
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Text style={heading}>Welcome to Sameeksha, {username}! 🎉</Text>
            <Text style={subheading}>
              We&apos;re excited to have you join our community of open minds and meaningful conversations.
            </Text>
          </Section>

          {/* OTP Section */}
          <Section style={otpSection}>
            <Text style={otpLabel}>Your Verification Code</Text>
            <Text style={otpDisplay}>{otp}</Text>
            <Text style={otpInstruction}>
              Enter this code to verify your account
            </Text>
          </Section>

          {/* Bilingual Message */}
          <Section style={messageSection}>
            <Text style={messageText}>
              Yeh code app mein enter karke apna account verify karein.
            </Text>
            <Text style={cautionText}>
              Apne vichaar rakhein bina kisi sankoch ke! Agar aapne yeh code
              request nahi kiya, toh chinta na karein! Is email ko ignore karein
              aur agar koi dikkat ho toh hamari support team se sampark karein.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              We&apos;re here to help you foster open communication and constructive dialogue.
              Welcome aboard, and happy connecting! 🚀
            </Text>
            <Text style={signatureText}>
              Warm regards,
              <br />
              Gyandeep Aryan
              <br />
              Sameeksha
            </Text>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "'Inter', Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const logoSection = {
  padding: "32px 48px",
  textAlign: "center" as const,
};

const logo = {
  color: "#0A2540",
  fontSize: "32px",
  fontWeight: "600",
  textDecoration: "none",
};

const heroSection = {
  padding: "32px 48px",
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  margin: "0 0 24px",
};

const heading = {
  color: "#0A2540",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 16px",
};

const subheading = {
  color: "#425466",
  fontSize: "16px",
  lineHeight: "1.4",
  margin: "0 0 24px",
};

const otpSection = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "32px 48px",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const otpLabel = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 8px",
};

const otpDisplay = {
  color: "#0f172a",
  fontSize: "32px",
  fontWeight: "600",
  letterSpacing: "0.1em",
  margin: "0 0 8px",
  fontFamily: "monospace",
};

const otpInstruction = {
  color: "#64748b",
  fontSize: "14px",
  margin: "0",
};

const messageSection = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px 48px",
  margin: "0 0 24px",
};

const messageText = {
  color: "#334155",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const cautionText = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const footer = {
  textAlign: "center" as const,
  padding: "0 48px",
};

const footerText = {
  color: "#475569",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 32px",
};

const signatureText = {
  color: "#334155",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};