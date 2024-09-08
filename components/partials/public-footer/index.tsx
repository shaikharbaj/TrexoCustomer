"use client"
import Image from "next/image";
import Link from "next/link";
import facebook from "@/public/images/social/facebook-1.png"
import twitter from "@/public/images/social/twitter-1.png"
import FavIcon from "@/public/images/all-img/fav-icon.png"
import Insta from "@/public/images/social/instagram.png"

const PublicFooter = () => {
  const socials = [
    {
      icon: Insta,
      href: "/"
    },
    {
      icon: twitter,
      href: "/"
    },
    {
      icon: facebook,
      href: "/"
    },
  ]
  return (
    <footer
      className="bg-[#192537] bg-cover bg-center bg-no-repeat relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-default-900/90 dark:before:bg-default-100">
      <div className="py-16 2xl:py-[120px]">
        <div className="container">
          <div className="flex justify-between gap-32">
            <div className="flex flex-col relative w-full">
              <Link href="/" className="flex items-center gap-1">
                <Image src={FavIcon} alt="dashboard - Company Fav icon" className="w-[46px] m-auto object-cover" priority={true} />
                <div className="flex-1  text-xl">
                  <span className="text-white font-extrabold">Trexo</span> <span className="text-white dark:text-primary font-light">Pro</span>
                </div>
              </Link>
              <p className="text-base leading-7 text-[#FFFFFFCC] dark:text-default-600 mt-3">Lorem Ipsum dolar Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl amet augue euismod, viverra dolor eu.</p>
              <div className="mt-8 flex items-center flex-wrap gap-5">
                {
                  socials.map((item, index) => (
                    <Link
                      href={item.href}
                      key={`social-link-${index}`}
                      target="_blank"
                    >
                      <Image src={item.icon} alt="social" width={30} height={30} />
                    </Link>
                  ))
                }
              </div>
            </div>
            <div className="relative w-full">
              <h1 className=" text-white font-bold text-[30px] mb-10">Contact Us</h1>
              <p className="text-base leading-7 text-[#FFFFFFCC] dark:text-default-600">Lorem Ipsum dolar Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl amet augue euismod, viverra dolor eu.</p>
            </div>
            <div className="relative w-full">
              <h1 className=" text-white font-bold text-[30px] mb-10">Services</h1>
              <p className="text-base leading-7 text-[#FFFFFFCC] dark:text-default-600">Lorem Ipsum dolar Sed eu massa luctus, tempor lacus ac, bibendum urna. Fusce bibendum sit amet nisl amet augue euismod, viverra dolor eu.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;