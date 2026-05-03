import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
