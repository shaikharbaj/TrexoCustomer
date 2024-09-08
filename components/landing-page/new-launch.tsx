"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useThemeStore } from "@/store";
import Image from "next/image";
import CarImage from "@/public/images/all-img/car11.png";

interface INewLaunchProps { }

const NewLaunch: React.FC<INewLaunchProps> = () => {
    const { isRtl } = useThemeStore();
    return (
        <>
            <section className="py-10">
                <div className="container">
                    <div className=" mb-10 space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl md:text-2xl xl:text-[38px] xl:leading-[52px] font-bold">
                                Newly  <span className="text-primary font-light">Launch</span><span className="text-primary"><span className="text-[#ff5757]">.</span></span>
                            </h1>
                            <Button size="md">
                                <Link href="/shop" className="text-sm font-normal m-auto">
                                    All Products
                                </Link>
                            </Button>
                        </div>
                        <p className="text-primary">Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl bibendum. Etiam sed augue euismod, viverra dolor eu, aliquet massa Aliquam accumsan sollicitudin luctus Nulla tempus quam felis, eu ullamcorper nunc vestibulum eu Nam ullamcorper tempus mi sit amet imperdiet In gravida felis velit, vel tempus purus euismod vitae Donec.</p>
                    </div>
                    <div className=" space-y-10">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                direction: isRtl ? "rtl" : "ltr",
                            }}
                            className="w-full mx-auto"
                        >
                            <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                        <div className="p-6 rounded-2xl duration-200 text-center">
                                            <div className="mb-4">
                                                <Image
                                                    className="max-w-full m-auto rounded-md"
                                                    src={CarImage}
                                                    alt="image"
                                                />
                                            </div>
                                            <div className="text-center text-xl font-bold space-y-3 my-2">
                                                <h1 className="text-primary">Toyota Innova Crysta</h1>
                                                <h2 className="text-[#ff5757]">₹ 8,50,650</h2>
                                            </div>
                                            <div className="text-center mt-4">
                                                <Button size="lg">
                                                    <Link href="/" className="text-sm font-normal m-auto">
                                                        Request Quote
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewLaunch;
