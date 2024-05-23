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
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AtSign, Github, Linkedin, Phone, Server, Twitter,ArrowUpRight , MessageCircle} from "lucide-react";
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
      id: 1,
      icon: < MessageCircle className="inline"/>,
      title: "whatsap",
      link: "https://api.whatsapp.com/send?phone=917004669519&text=Hi",
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
    {
      id: 5,
      icon: <Server />,
      title: "discord",
      link: "",
      desc: "gyandeeparyan"
    }
  ];




  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className='md:m-12 m-4'>
      {/* app introduction with carasual */}
      <div className='bg-purple-100 dark:bg-mainDark rounded-3xl my-4 flex flex-col md:flex-row gap-5 justify-between p-8'>
        {/* text description with accordion */}
        <div className=' flex flex-col gap-4 p-2 md:max-w-[45%]'>
          <p className="m-2">
            Sameeksha is anonymous messaging and feedback app designed to foster open
            communication and constructive dialogue. Whether you are a teacher
            seeking honest feedback from students, a mentor encouraging
            anonymous questions from mentees, or simply looking for a platform
            to engage in fun and casual conversations .
          </p>
          {/* accordion */}
          <div className="m-2 text-left">
          <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
        <AccordionTrigger>How does anonymity work ?</AccordionTrigger>
        <AccordionContent>
        Sameeksha ensures user anonymity by not requiring any personal information. Messages and feedback are shared without revealing the sender's identity, promoting honest and open communication.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Who can use Sameeksha?</AccordionTrigger>
        <AccordionContent>
        Sameeksha is ideal for teachers, mentors, students, mentees, and anyone looking to have open and honest conversations. It's perfect for educational environments, mentoring relationships, and casual conversations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How is Sameeksha different ?</AccordionTrigger>
        <AccordionContent>
        Sameeksha stands out because of its focus on anonymity and honest feedback. Unlike traditional messaging apps, Sameeksha prioritizes open and candid communication without the influence of identity.
        </AccordionContent>
      </AccordionItem>
</Accordion>

          </div>
        </div>
        {/* Carasual component/Images */}

        <div className="m-2  p-6 md:max-w-[35%] ">
        <Carousel plugins={[Autoplay({ delay: 2000 })]}>
  <CarouselContent>
    <CarouselItem>      <div className="bg-indigo-100 dark:bg-accentDark mx-5  rounded-3xl">
<Image src={"https://illustrations.popsy.co/amber/remote-work.svg"} alt="a man messaging" width={400} height={400}></Image>
        </div></CarouselItem>
    <CarouselItem>      <div className="bg-indigo-100 dark:bg-accentDark mx-5  rounded-3xl">
<Image src={"https://illustrations.popsy.co/amber/remote-work.svg"} alt="a man messaging" width={400} height={400}></Image>
        </div></CarouselItem>
    <CarouselItem>      <div className="bg-indigo-100 dark:bg-accentDark mx-5  rounded-3xl">
<Image src={"https://illustrations.popsy.co/amber/remote-work.svg"} alt="a man messaging" width={400} height={400}></Image>
        </div></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

        </div>
      </div>

    

      {/* meet the developer */}
      <div>
        <div className='bg-blue-100 dark:bg-mainDark my-4 rounded-3xl flex flex-col md:flex-row gap-5 justify-between'>
        <div className="flex max-w-2xl flex-col items-center  rounded-md  md:flex-row">

      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <Image
        width={400}
        height={400}
          src="https://illustrations.popsy.co/amber/remote-work.svg"
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4 m-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
          Gyandeep Aryan <ArrowUpRight className="ml-2 h-4 w-4" />
          </h1>
         
          <p className="mt-3 text-sm ">
           I am a fullstack developer crafting beautiful and accessible web , one component at a time
          </p>
          <div className="mt-4 flex ">
            {contactData.map((item)=>(
              <div key={item.link}>
              <Link href={item.link} passHref  target="_blank" rel="noopener noreferrer" >
              <span  className="mb-2 -ml-2  mr-4 inline-block  px-2  rounded-full bg-transparent  py-1 text-[10px] font-semibold ">
              {item.icon}
            </span>
              </Link>
              </div>
            ))}
            
           
          </div>
          
        </div>

        
      </div>
    </div>
<div className="m-4  flex  flex-col gap-5 p-4">
<p className="ml-1 text-sm max-w-[50%]">Lets connect and share ideas! Send me a message  and I am here to listen.</p>
<Link href="https://sameeksha.vercel.app/u/gyan" passHref  target="_blank" rel="noopener noreferrer">

              <Button
                type='button'
                variant='secondary'
                className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Message Me Anonymously
              </Button>
              
            </Link>
</div>
   
        </div>
      </div>
    </div>
  );
}