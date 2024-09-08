import Link from "next/link";
import { Button } from "@/components/ui/button";
import StratWith from "@/public/images/landing-page/start.png"

interface IStartWithProps{}

const StartWith:React.FC<IStartWithProps> = () => {
  return (
    <>
      <section className="py-20 overflow-hidden" id="offers">
        <div className="p-20 flex gap-10 rounded-[40px] w-[90%] m-auto overflow-hidden relative !bg-cover !bg-center !bg-no-repeat"
          style={{
            background: `url(${StratWith.src})`
          }}
        >
            <div className="w-1/3 relative z-20">
                <h1 className="text-[50px] font-bold leading-normal text-white">Start your journey with Trexo</h1>
                <p className="text-[#FFFFFFCC] text-[14px] mb-9 mt-4">Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl bibendum. Etiam sed augue euismod, viverra dolor eu, aliquet massa Aliquam accumsan sollicitudin luctus Nulla tempus quam felis.</p>
                <Button asChild size="lg" className="rounded-full mt-10 bg-white text-[#33507C] px-6">
                    <Link href="/login">Start Now </Link>
                </Button>
            </div>
        </div>
      </section>
    </>
  );
};

export default StartWith;
