import { ContactScreen } from "@/screens/contact/contacts.screen";
import { SEO } from "@/common/components";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Luci Latin Dance School. Have questions about our bachata, salsa, or chair dancing classes? We'd love to hear from you."
        canonical="https://bachagata.vercel.app/contact"
      />
      <ContactScreen />
    </>
  );
}
