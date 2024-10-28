"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

import { User } from "next-auth";
import { Menu, X, Home, BadgeInfo, MessageCircle, Pen } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const menuItems = [
    {
      name: "Home",
      icon: <Home />,
      href: "/",
    },
    {
      name: "About",
      icon: <BadgeInfo />,
      href: "/about",
    },
    {
      name: "Messages",
      icon: <MessageCircle />,
      href: "/dashboard",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a fallback UI while the component is mounting
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-mainDark dark:bg-mainDark text-textLight dark:text-textDark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-10">
      <Link href="/">
        <div className="inline-flex items-center space-x-2">
          {/* <span>
          <Image className="scale-150" src={"https://res.cloudinary.com/dzbmc0pit/image/upload/v1718204759/Sameeksha/kdpzsxpcl4exi89i0rch.svg"} alt="signup illustration" width={100} height={100}></Image>
          </span> */}
         
          <span className="text-3xl font-bold dark:text-accentDark">समीक्षा</span>
        </div>
        </ Link>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm md:text-md flex flex-row items-end gap-2 hover:font-semibold hover:text-gray-900 dark:hover:text-gray-200"
                >
                 
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex gap-3">
          {session ? (
            <Button
              variant="secondary"
              className="rounded-lg bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              type="button"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button
                type="button"
                variant="secondary"
                className="rounded-lg bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Login
              </Button>
            </Link>
          )}

          <ModeToggle />
        </div>
        <div className="lg:hidden flex">
          <div className="flex items-center">
            
          </div>
          <ModeToggle />
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
