import { SEO } from "@/common/components";
import { ContactScreen } from "@/screens/contact/contacts.screen";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Luci Latin Dance School. Have questions about our bachata, salsa, or Chair Burlesque classes? We'd love to hear from you."
        canonical="https://bachagata.vercel.app/contact"
      />
      <ContactScreen />
    </>
  );
}
