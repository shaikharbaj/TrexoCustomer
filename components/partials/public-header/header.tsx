"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Icon } from "@iconify/react";
import ThemeButton from "@/components/partials/header/theme-button";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import FavIcon from "@/public/images/all-img/fav-icon.png";
import NavMenu from "./nav-menu";
import Language from "../header/language";
import { getCookie } from "@/utils/cookie";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface IHeaderProps { }

const PublicHeader: React.FC<IHeaderProps> = () => {
  const isAuthenticated = getCookie('token');
  const [scroll, setScroll] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  if (!isDesktop) {
    return (
      <>
        <div className={scroll ? "bg-card/50 dark:bg-card/70 backdrop-blur-lg z-50 shadow-sm fixed top-0 left-0 w-full py-3" : "fixed top-0 left-0 w-full py-3"}>
          <nav className="container flex justify-between relative z-50">
            <Link href="/" className="flex items-center gap-1">
              <Image src={FavIcon} alt="dashboard - Company Fav icon" className="w-[39px] m-auto object-cover" priority={true} />
              <div className="flex-1  text-xl">
                <span className="text-white font-extrabold">Trexo</span> <span className="text-white dark:text-primary font-light">Pro</span>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <ThemeButton />
              <Language />
              {!isAuthenticated ? (
                <>
                  <Button asChild size="sm">
                    <Link href="/register" target="__blank" className="text-sm font-semibold">
                      <Icon icon="heroicons:shopping-cart" className="w-4 h-4 me-1.5" />
                      Register
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/login" className="text-sm font-semibold">
                      <Icon icon="heroicons:arrow-left-end-on-rectangle" className="w-4 h-4 me-1.5" />
                      Login
                    </Link>
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      Dashboard
                      <Icon icon="heroicons:chevron-down" className=" h-5 w-5 ml-2 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[196px]" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/wishlist"}>Wishlist</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <button type="button">
                <Menu
                  className=" h-6 w-6 cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </button>
            </div>
          </nav>
        </div>
      </>
    );
  }
  return (
    <div className={scroll ? "bg-[#142A4A] backdrop-blur-lg shadow-xl z-30 dark:bg-card/70 fixed top-0 left-0 w-full py-2 duration-200" : "bg-[#142A4A]  duration-200 z-30 fixed top-0 left-0 w-full py-4"}>
      <nav className="container flex justify-between">
        <div className="flex justify-start gap-12">
          <Link href="/" className="flex items-center gap-1">
            <Image src={FavIcon} alt="dashboard - Company Fav icon" className="w-[39px] m-auto object-cover" priority={true} />
            <div className="flex-1  text-xl">
              <span className="text-white font-extrabold">Trexo</span> <span className="text-white dark:text-primary font-light">Pro</span>
            </div>
          </Link>
          <NavMenu />
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <Language />
          {!isAuthenticated ? (
            <>
              <Button asChild size="sm" variant="outline" color="secondary">
                <Link href="/register" className="text-sm font-semibold">
                  <Icon icon="heroicons:shopping-cart" className="w-4 h-4 me-1.5" />
                  Create New Account
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login" className="text-sm font-semibold">
                  <Icon icon="heroicons:arrow-left-end-on-rectangle" className="w-4 h-4 me-1.5" />
                  Login
                </Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Dashboard
                  <Icon icon="heroicons:chevron-down" className=" h-5 w-5 ml-2 " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[196px]" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem><Link href={"/wishlist"}>Wishlist</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </div>
  );
};

export default PublicHeader;
