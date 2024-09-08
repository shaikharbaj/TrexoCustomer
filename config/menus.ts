import {
  DashBoard,
  Settings,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const publicMenu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "#",
    child: [
      {
        title: "Solar",
        href: "/solar",
      },
      {
        title: "Women's Clothing",
        href: "#",
      },
      {
        title: "Accessories",
        href: "#",
      },
      {
        title: "Footwear",
        href: "#",
      },
      {
        title: "New Arrivals",
        href: "#",
      },
      {
        title: "Sale",
        href: "#",
      },
    ],
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
];


export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/dashboard",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
