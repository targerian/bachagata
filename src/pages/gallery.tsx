import { GalleryScreen } from "@/screens/gallery/gallery.screen";
import { SEO } from "@/common/components";

export default function Gallery() {
  return (
    <>
      <SEO
        title="Photo Gallery"
        description="Explore photos from our bachata classes, performances, workshops, and social events. See the energy and passion of our dance community."
        canonical="https://bachagata.vercel.app/gallery"
      />
      <GalleryScreen />
    </>
  );
}
