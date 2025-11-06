import Head from "next/head";
import { SEO } from "@/common/components";
import { HomeScreen } from "@/screens/home/home.screen";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["DanceSchool", "SportsActivityLocation"],
    name: "Luci Latin Dance School",
    description:
      "Professional bachata, salsa, and Chair Burlesque classes with Looci, an experienced instructor dedicated to sharing the joy of Latin dance.",
    url: "https://bachagata.vercel.app/",
    image: "https://bachagata.vercel.app/images/lucy/photoshoot-2.webp",
    instructor: {
      "@type": "Person",
      name: "Looci",
      jobTitle: "Professional Bachata Instructor",
      description:
        "With over a decade of experience teaching bachata, salsa, and Chair Burlesque.",
    },
    offers: {
      "@type": "Offer",
      category: "Dance Classes",
      itemOffered: [
        {
          "@type": "Service",
          name: "Bachata Classes",
          description:
            "Learn fundamental steps, sensual body movement, and intricate partner work.",
        },
        {
          "@type": "Service",
          name: "Salsa Classes",
          description: "Master the timing, spins, and stylish footwork.",
        },
        {
          "@type": "Service",
          name: "Chair Burlesque Classes",
          description:
            "Build confidence and express yourself in this empowering solo dance style.",
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title="Looci Bachagata | Bachata, Salsa & Chair Burlesque Classes"
        description="Transform your dance with Looci, a professional bachata instructor with over a decade of experience. Learn bachata, salsa, and Chair Burlesque in a supportive, fun atmosphere."
        canonical="https://bachagata.vercel.app/"
      />
      <Head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - Structured data from trusted source for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <HomeScreen />
    </>
  );
}
