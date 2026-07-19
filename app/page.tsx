import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import CurrentlySection from "@/components/CurrentlySection";
import GitHubActivity from "@/components/GitHubActivity";

export default function Home() {
  return (
    <main className="max-w-[720px] mx-auto px-6">
      <HeroSection />
      <hr className="w-full h-px bg-border border-none my-4" />
      <FeaturedProjects />
      <hr className="w-full h-px bg-border border-none my-12" />
      <GitHubActivity />
      <hr className="w-full h-px bg-border border-none my-12" />
      <CurrentlySection />
    </main>
  );
}
