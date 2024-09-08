"use client";
import Hero from "./banner";
import LayoutLoader from "@/components/layout-loader";
import { useMounted } from "@/hooks/use-mounted";
import NewLaunch from "./new-launch";
import DiscountMania from "./discount-mania";
import Offers from "./offers";
import Testimonials from "./testimonials";
import StartWith from "./start-with";

interface ILandingPageProps { }

const LandingPage: React.FC<ILandingPageProps> = () => {
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }
  return (
    <div className="bg-background">
      <Hero />
      <NewLaunch />
      <DiscountMania />
      <Offers />
      <Testimonials />
      <StartWith />
    </div>
  );
};

export default LandingPage;
