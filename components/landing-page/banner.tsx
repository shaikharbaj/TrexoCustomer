import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BannerBg from "@/public/images/landing-page/bannerbg.jpg";

interface IBanner { }

const Banner: React.FC<IBanner> = () => {
  return (
    <>
      <section className="bg-[#142A4A]" id="home">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 items-center py-52">
            <div className="">
              <h1 className="text-white text-[50px] leading-normal">Get Your </h1>
              <h1 className="text-white text-[50px] font-bold leading-normal">Dream Car Today.</h1>
              <p className="text-[#FFFFFFCC] text-[16px] leading-normal font-light my-8">Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl bibendum. Etiam sed augue euismod, viverra dolor eu, aliquet massa Aliquam accumsan sollicitudin luctus Nulla tempus quam felis, eu ullamcorper nunc vestibulum eu Nam ullamcorper tempus mi sit amet imperdiet In gravida felis velit, vel tempus purus euismod vitae Donec.</p>
              <Button asChild size="lg" variant="outline" color="secondary" className="rounded-full mt-10">
                  <Link href="/">Learn More </Link>
              </Button>
            </div>
            <div>
              <div className="rounded-[50px] bg-white/10">
                <div className="relative hidden z-10 lg:block after:absolute after:w-full after:h-full after:top-4 after:z-[-1] after:rounded-[50px] after:-left-4 after:bg-[#294164]">
                  <Image src={BannerBg} alt="screenshot" className="rounded-[50px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
