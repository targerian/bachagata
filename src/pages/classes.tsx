import { ClassesScreen } from "@/screens/classes/classes.screen";
import { SEO } from "@/common/components";

export default function Classes() {
  return (
    <>
      <SEO
        title="Dance Classes & Booking"
        description="Book your bachata, salsa, or chair dancing class with Looci. Choose from our class schedule and start your dance journey today."
        canonical="https://bachagata.vercel.app/classes"
      />
      <ClassesScreen />
    </>
  );
}
