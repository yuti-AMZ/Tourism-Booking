import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeSection from "@/components/home/HomeSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import GallerySection from "@/components/home/GallerySection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default async function Home() {
  const session = await getAuthSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <HomeSection />
      <DestinationsSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
