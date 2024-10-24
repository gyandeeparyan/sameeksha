"use client"
import {useState,useEffect} from "react"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import { useSession, signOut } from "next-auth/react";
import {User} from "next-auth"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dynamic from 'next/dynamic'
 

export default function Home() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const registerServiceWorker = async () => {
      // Move the conditional check inside the function
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered with scope:", registration.scope);
        } catch (err) {
          console.error("Service Worker registration failed:", err);
        }
      }
    };
  
    // Call the registration function unconditionally
    registerServiceWorker();
  }, []);


  if (typeof window === 'undefined'){
    return null
}

 // Empty dependency array since we only want this to run once // Dependency array remains empty to run only on mount


  return (
    <>
    
      {/* Main content */}
      <main className='flex-grow  flex flex-col-reverse  dark:text-textDark md:flex-row items-center md:justify-between justify-center px-4 md:px-24 py-12 bg-backgroundLight dark:bg-backgroundDark '>
        <section className='text-left mb-8 mx-6 '>
          <h1 className='text-3xl md:text-7xl md:w-[650px]   font-semibold'>
            dive into the world of anonymous conversations
          </h1>
          <p className='mt-3 md:mt-5 text-base md:text-lg md:w-[250px]'>
           apne vichaar rakhein bina kisi sankoch ke!
          </p>
          <div className='flex gap-2'>
          <Link href="/sign-up">
          <Button
            type='button'
            variant='secondary'
            className='rounded-lg mt-6 md:mt-10 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
            Sign up
          </Button>
          </Link>
                  {session ? (
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => signOut()}
                      className='rounded-lg mt-6 md:mt-10 md:hidden mx-4 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                      Logout
                    </Button>
                  ) : (
                    <Link href='/sign-in'>
                      <Button
                        type='button'
                        variant='secondary'
                        className='rounded-lg mt-6 md:mt-10 md:hidden mx-4  bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
          
        </section>

        <div className="bg-indigo-100 dark:bg-accentDark mx-5 mb-10 rounded-3xl">
<Image src={"https://illustrations.popsy.co/amber/remote-work.svg"} alt="a man messaging" width={500} height={700}></Image>
        </div>

      
      </main>

    
    </>
  );
}
