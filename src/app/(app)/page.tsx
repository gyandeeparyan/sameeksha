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

  if (typeof window === 'undefined'){
    return null
}
  return (
    <>
    
      {/* Main content */}
      <main className='flex-grow  flex flex-col-reverse  dark:text-textDark md:flex-row items-center md:justify-between justify-center px-4 md:px-24 py-12 bg-backgroundLight dark:bg-backgroundDark '>
        <section className='text-left mb-8 mx-6 '>
          <h1 className='text-3xl md:text-7xl md:w-[650px]   font-semibold'>
            dive into the world of anonymous conversations
          </h1>
          <p className='mt-3 md:mt-5 text-base md:text-lg md:w-[250px]'>
            sameeksha - apne vichaar rakhein bina kisi sankoch ke!
          </p>
          <div className='flex gap-2'>
          <Link href="/sign-up">
          <Button
            type='button'
            variant='secondary'
            className='rounded-xl mt-6 md:mt-10 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
            Sign up
          </Button>
          </Link>
                  {session ? (
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => signOut()}
                      className='rounded-xl mt-6 md:mt-10 md:hidden mx-4 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                      Logout
                    </Button>
                  ) : (
                    <Link href='/sign-in'>
                      <Button
                        type='button'
                        variant='secondary'
                        className='rounded-xl mt-6 md:mt-10 md:hidden mx-4  bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
          
        </section>

        <div className="bg-indigo-100 dark:bg-accentDark mx-5 mb-10 rounded-3xl">
<Image src={"https://illustrations.popsy.co/amber/remote-work.svg"} alt="a man messaging" width={500} height={700}></Image>
        </div>

        {/* Carousel for Messages */}
        {/* <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className='w-full max-w-lg md:max-w-xl'>
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className='p-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4'>
                    <Mail className='flex-shrink-0' />
                    <div>
                      <p>{message.content}</p>
                      <p className='text-xs text-muted-foreground'>
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel> */}
      </main>

      {/* Footer */}
    
    </>
  );
}
