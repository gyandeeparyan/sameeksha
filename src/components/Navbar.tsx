"use client";

import React from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import { Menu, X ,Home,BadgeInfo,MessageCircle,MessageCircleQuestion,Pen} from "lucide-react";
import { ModeToggle } from "./ModeToggle";
function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const menuItems = [
    {
      name: "Home",
      icon:<Home/>,
      href: "/",
    },
    {
      name: "About",
      icon:<BadgeInfo/>,
      href: "/about",
    },
    {
      name: "Messages",
      icon:<MessageCircle/>,
      href: "/dashboard",
    },
    {
      name: "Request features",
      icon:<MessageCircleQuestion/>,
      href: "/request-feature",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='relative w-full bg-mainDark dark:bg-mainDark text-textLight dark:text-textDark'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8'>
      <div className='inline-flex items-center space-x-2'>
                    <span>
                      <Pen/>
                    </span>
                    <span className='font-semibold text-3xl font-junge'>sameeksha</span>
                  </div>
        <div className='hidden grow items-start lg:flex'>
          <ul className='ml-12 inline-flex space-x-8'>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className='text-sm font-semibold flex flex-row items-center gap-2 hover:text-gray-900 dark:hover:text-gray-200'>
                  {item.icon}  
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden  lg:flex gap-2 '>
          {session ? (
            <Button
              variant='secondary'
              className='rounded-xl bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
              type='button'
              onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Link href='/sign-in'>
              <Button
                type='button'
                variant='secondary'
                className='rounded-xl bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Login
              </Button>
            </Link>
          )}

          <ModeToggle />
        </div>
        <div className='lg:hidden flex '>
          <div className='flex items-center '>
            <Menu onClick={toggleMenu} className='h-6  w-6 cursor-pointer' />
          </div>
        </div>
        {isMenuOpen && (
          <div className='absolute inset-x-0 top-0 z-50 origin-top-right transform  p-2 transition lg:hidden'>
            <div className='divide-y-2 divide-gray-50 rounded-xl border dark:border-textDark dark:bg-mainDark bg-mainLight text-textDark shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='px-5 pb-6 pt-5'>
                <div className='flex items-center justify-between'>
                  <div className='inline-flex items-center space-x-2'>
                    <span>
                      <Pen/>
                    </span>
                    <span className='font-semibold  text-3xl font-junge '>sameeksha</span>
                  </div>
                  <div className='-mr-2'>
                    <button
                      type='button'
                      onClick={toggleMenu}
                      className='inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                      <span className='sr-only'>Close menu</span>
                      <X className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                </div>
                <div className='mt-6'>
                  <nav className='grid gap-y-4'>
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50'>
                        <span className='ml-3 flex flex-row items-center gap-2 text-base font-medium'>
                        {item.icon} 
                          {item.name}
                        </span>
                      </a>
                    ))}

                    <ModeToggle />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
