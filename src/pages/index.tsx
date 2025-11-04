import { HomeScreen } from "@/screens/home/home.screen";
import { SEO } from "@/common/components";
import Head from "next/head";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["DanceSchool", "SportsActivityLocation"],
    name: "Luci Latin Dance School",
    description:
      "Professional bachata, salsa, and chair dancing classes with Looci, an experienced instructor dedicated to sharing the joy of Latin dance.",
    url: "https://bachagata.vercel.app/",
    image: "https://bachagata.vercel.app/images/lucy/photoshoot-2.webp",
    instructor: {
      "@type": "Person",
      name: "Looci",
      jobTitle: "Professional Bachata Instructor",
      description:
        "With over a decade of experience teaching bachata, salsa, and chair dancing.",
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
          name: "Chair Dancing Classes",
          description:
            "Build confidence and express yourself in this empowering solo dance style.",
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title="Luci Latin Dance School | Bachata, Salsa & Chair Dancing Classes"
        description="Transform your dance with Looci, a professional bachata instructor with over a decade of experience. Learn bachata, salsa, and chair dancing in a supportive, fun atmosphere."
        canonical="https://bachagata.vercel.app/"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <HomeScreen />
    </>
  );
}
