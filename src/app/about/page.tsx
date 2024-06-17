"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AtSign, Github, Linkedin, Phone, Server, Twitter, ArrowUpRight, MessageCircle } from "lucide-react";

export default function About() {

  const contactData = [
    {
      id: 1,
      icon: <AtSign className="inline"/>,
      title: "email",
      link: "gyandeeparyan.dev@gmail.com",
      desc: "gyandeeparyan.dev@gmail.com"
    },
   
    {
      id: 2,
      icon: <Phone />,
      title: "phone",
      link: "7004669519",
      desc: "7004669519"
    },
    {
      id: 8,
      icon: <Linkedin/>,
      title: "linkdin",
      link: "https://www.linkedin.com/in/gyandeep-aryan-6a7509176/",
      desc: "gyandeep-aryan-6a7509176"
    },
    {
      id: 3,
      icon: <Twitter />,
      title: "twitter",
      link: "https://twitter.com/gyandeeeparyan",
      desc: "gyandeeeparyan"
    },
    {
      id: 4,
      icon: <Github />,
      title: "github",
      link: "https://github.com/gyandeeparyan",
      desc: "gyandeeparyan"
    },
   
  ];

  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className='md:px-14 md:py-7 p-4'>
      <div className='bg-purple-100  dark:border-[0.5px] border-neutral-600 dark:bg-mainDark rounded-3xl flex flex-col md:flex-row gap-5 justify-between p-8'>
        {/* text description with accordion */}
        <div className=' flex flex-col justify-center  items-center gap-4 p-2 md:max-w-[90%]'>
          {/* <p className="m-2">
            Sameeksha is anonymous messaging and feedback app designed to foster open
            communication and constructive dialogue. Whether you are a teacher
            seeking honest feedback from students, a mentor encouraging
            anonymous questions from mentees, or simply looking for a platform
            to engage in fun and casual conversations.
          </p> */}
          {/* accordion */}
          <div className="justify-center  items-center text-left ">
            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>How to use Sameeksha ?</AccordionTrigger>
                <AccordionContent>
                  Step 1 - Register yourself , after verifying your email you will be redirected to dashboard.
                  <br/>
                  <br/>
                  Step 2 - Copy & Share your Sameeksha handle , which looks like https://sameeksha.vercel.app/u/gyan
                  <br/>
                  <br/>
                  Step 3 - Keep an eye on dashboard . All your messages will be synced automatically as soon as anyone sends anything on your handle 
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does anonymity work ?</AccordionTrigger>
                <AccordionContent>
                  Sameeksha ensures user anonymity by not requiring any personal information. Messages and feedback are shared without revealing the sender&apos;s identity, promoting honest and open communication.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Who can use Sameeksha?</AccordionTrigger>
                <AccordionContent>
                  Sameeksha is ideal for teachers, mentors, students, mentees, and anyone looking to have open and honest conversations. It&apos;s perfect for educational environments, mentoring relationships, and casual conversations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How is Sameeksha different ?</AccordionTrigger>
                <AccordionContent>
                  Sameeksha stands out because of its focus on anonymity and honest feedback. Unlike traditional messaging apps, Sameeksha prioritizes open and candid communication without the influence of identity.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* Carasual component/Images */}
        <div className="m-2 p-6 md:max-w-[35%]">
          <Carousel plugins={[Autoplay({ delay: 2000 })]}>
            <CarouselContent>
              <CarouselItem>
                <div className="bg-indigo-100 dark:bg-accentDark mx-5 rounded-3xl">
                  <Image src={"https://illustrations.popsy.co/amber/creative-work.svg"} alt="a man messaging" width={400} height={400}></Image>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-indigo-100 dark:bg-accentDark mx-5 rounded-3xl">
                  <Image src={"https://illustrations.popsy.co/amber/engineer.svg"} alt="a man messaging" width={400} height={400}></Image>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-indigo-100 dark:bg-accentDark mx-5 rounded-3xl">
                  <Image src={"https://illustrations.popsy.co/amber/student-in-the-classroom.svg"} alt="a man messaging" width={400} height={400}></Image>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      {/* meet the developer */}
      <div className="">
        <div className='bg-blue-100 dark:border-[0.5px] border-neutral-600 dark:bg-mainDark my-4 rounded-3xl flex flex-col md:flex-row gap-5 justify-around p-8'>
      
          <div className="flex max-w-2xl flex-col items-center p-2 rounded-md md:flex-row">
          
            <div className="h-150 hidden w-150 rounded-3xl bg-blue-200 dark:bg-purple-400 md:h-[200px] md:w-[200px]">
            
              <Image
                width={400}
                height={400}
                src="https://illustrations.popsy.co/amber/remote-work.svg"
                alt="Laptop"
                className="h-full w-full   rounded-xl object-cover"
              />
            </div>
            <div>
            
              <div className="my-4 md:mx-5">
                <h1 className="inline-flex items-center dark:text-highlightLight md:text-5xl text-3xl font-semibold ">
                  Gyandeep Aryan <ArrowUpRight className="ml-2 h-4 w-4" />
                </h1>
                
                <p className="mt-3 md:text-lg text-cardDark text-sm">
                  Crafting beautiful and accessible web, one component at a time
                </p>
                <Link href="https://sameeksha.vercel.app/u/gyan" passHref target="_blank" rel="noopener noreferrer">
              <Button
                type='button'
                variant='secondary'
                className='rounded-lg mt-3 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Message Me Anonymously
              </Button>
            </Link>
              </div>
            </div>
          </div>

          <div className="m-4 flex flex-col gap-5">
             {/* <p className="ml-1 text-sm md:max-w-[50%]">Lets connect and share ideas! Send me a message and I am here to listen.</p>
             */}
             <div className="mt-4 flex-col flex ">
            {contactData.map((item)=>(
              <div key={item.link}>
              <Link href={item.link} passHref  target="_blank" rel="noopener noreferrer" >
              <span  className="mb-2 -ml-2  mr-4 flex items-center gap-4  px-2  rounded-full bg-transparent  py-1   ">
              {item.icon}
              {item.desc}
            </span>
              </Link>
              </div>
            ))}
            
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
