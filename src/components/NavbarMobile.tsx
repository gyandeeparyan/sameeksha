'use client'
import React from 'react';
import Link from "next/link";
import { Menu,Home, X, IndianRupee, MessageSquareText,Info,ShoppingCart } from 'lucide-react';



const menuItems: { name: string; href: string;icon: JSX.Element;  }[] = [
    {
        name: 'Home',
        href: '/',
       
        icon: <Home  />,
        
        
    },
    {
        name: 'Messages',
        href: '/dashboard',
       
        icon: <MessageSquareText />,
        
    },
    {
        name: 'About',
        href: '/about',
       
        icon: <Info />,
        
    },
];

export function NavbarMobile() {
    return (
        <div className="sticky md:hidden z-50 bottom-0   bg-mainDark dark:bg-mainDark text-textLight dark:text-textDark w-full ">
            <div className="mx-auto  flex max-w-7xl items-center justify-between my-3 px-4 py-2 sm:px-6 lg:px-8">
                {menuItems.map((item) => (
                    <Link  key={item.name} href={item.href}>
                   <div className="flex-col dark:hover:bg-accentDark py-2 px-4 rounded-2xl dark:hover:text-mainDark  text-center justify-center items-center">
                    <span className="items-center ">{item.icon}</span>
                  
                   </div>
                   </Link>
                ))}
                
            </div>
        </div>
    );
}
