import Link from "next/link";
import { Button } from "@/components/ui/button";
import OfferBg from "@/public/images/landing-page/offer-bg.png";

interface IOfferProps{}

const Offers:React.FC<IOfferProps> = () => {
  return (
    <>
      <section className="py-20 overflow-hidden" id="offers">
        <div className="p-20 flex gap-10 rounded-[40px] w-[90%] m-auto overflow-hidden relative !bg-cover !bg-no-repeat !bg-center"
          style={{
            background: `url(${OfferBg.src})`
          }}
        >
            <div className="w-1/2 relative z-20">
                <h1 className="text-[50px] font-bold leading-normal text-white">Finance Offers at your <span className="block text-[#FFF700]">Finger Tips</span></h1>
                <p className="text-[#FFFFFFCC] text-[14px] mb-9 mt-4">Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl bibendum. Etiam sed augue euismod, viverra dolor eu, aliquet massa Aliquam accumsan sollicitudin luctus Nulla tempus quam felis. Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl bibendum. Etiam sed augue euismod, viverra dolor eu, aliquet massa Aliquam accumsan sollicitudin luctus Nulla tempus quam felis.</p>
                <Button asChild size="lg" className="rounded-full mt-10 bg-white/10 px-6">
                    <Link href="/">Learn More </Link>
                </Button>
            </div>
        </div>
      </section>
    </>
  );
};

export default Offers;
