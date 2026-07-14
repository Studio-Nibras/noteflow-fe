import HeroContent from "./HeroContent";
import LoginCard from "./LoginCard";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-center w-full">
        <HeroContent />

        <div className="flex justify-center lg:justify-end">
          <LoginCard />
        </div>
      </div>
    </section>
  );
}
