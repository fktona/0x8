import FaqSection from "@/components/faq";
import Hero from "@/components/hero";
import Search from "@/components/search";
import TraderPlatform from "@/components/track";
import Trade from "@/components/trade";

export default function Home() {
  try {
    return (
      <div className="w-full font-aktiv-regular lg:px-[40px] 2xl:px-[80px] px-5  max-w-screen-2xl mx-auto">
        <Search />
        <Hero />
        <Trade />
        <TraderPlatform />
        <FaqSection />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading users</div>;
  }
}
