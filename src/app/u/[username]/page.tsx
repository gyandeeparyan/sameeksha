"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams ,useSearchParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import Image from "next/image";

const separator = "||";

const parseMessages = (messageString: string): string[] => {
  return messageString.split(separator);
};

const defaultMessageString =
  "Do you prefer sunrise or sunset?||What's your favorite way to spend a day off? ||What's the best piece of advice you've ever received?";

const SendMessage = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: defaultMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
 
  const searchParams = useSearchParams();

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    const feedbackType = searchParams.get("utm_feedback_type") || "default";
    console.log(feedbackType)
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
        feedbackType
      });

      console.log(response)

      toast({
        title: response.data.message,
        variant: "default",
      });

      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    if (fetchCount >= 2) {
      setShowModal(true);
      toast({
        title: "Whoa, Slow Down!",
        description:
          "You have reached the limit to keep it affordable. Message khud likho ab!",
        variant: "destructive",
      });

      return;
    }
    try {
      setFetchCount((prev) => prev + 1);
      setIsLoading(true);
      complete("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error fetching messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (typeof window === "undefined") {
    return null;
  }

 


  return (
    <div className="  mt-4 md:m-10">
      <div className='md:px-14 md:py-7  px-4 flex flex-col md:flex md:flex-row gap-2 justify-around  rounded-xl   dark:bg-backgroundDark  w-full'>
        {/* message section */}
        <div className='flex  flex-col'>
          {/* message box */}
          <div className='bg-orange-100 dark:border-[0.5px] border-neutral-600  text-wrap dark:bg-mainDark w-full md:w-[75%] p-4  rounded-3xl '>
            <h1 className='text-4xl  font-bold mb-6 text-left'>
              Namaste from <span className="text-highlightLight"> {username}</span>.
              <p className='mt-3 md:mt-5 font-thin text-base md:text-lg md:w-[250px]'>
                unleash your thoughts, send anything anonymously!
              </p>
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'>
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='hidden'>
                        Send Anonymous Message to {username}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='aapke vichaar? yahan likhiye!'
                          className='resize-none bg-mainLight border border-transparent rounded-xl dark:bg-mainDark border-t-textDark border-l-textDark border-r-textDark border-b-textDark'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex justify-center'>
                  {isLoading ? (
                    <Button
                      disabled
                      className='w-full rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      className='w-full rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                      disabled={isLoading || !messageContent}>
                      Send
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
          {/*message suggestions box*/}
          {/*--------------------------------------------------------------------------------------------------------------------  */}

          <div className='bg-indigo-100 h-[25%] dark:border-[0.5px] border-neutral-600 my-6 dark:bg-mainDark flex flex-col w-full md:w-[75%]  p-4 rounded-3xl'>
            <div className='space-y-4  overflow-y-scroll text-left'>
              {/* sugeestions button */}
              <p className='font-semibold text-md mx-2'>AI Suggestions</p>
              <div className=' '>
                {/* generate button */}

                <Button
                  onClick={fetchSuggestedMessages}
                  className='rounded-full bg-highlightLight flex items-center dark:bg-highlightLight hover:bg-accentLight dark:hover:bg-accentLight px-4 text-sm font-semibold text-textLight shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                  disabled={isSuggestLoading || showModal}>
                  <span className='mx-2'>
                    <Sparkles />
                  </span>
                  Ask Sameeksha
                </Button>
              </div>

              {isSuggestLoading ? (
                <div className='flex flex-row gap-2 flex-wrap w-[100%]'>
                  <Skeleton className=' bg-zinc-300 dark:bg-zinc-800 ml-4 h-[50px] w-[100px] py-2 rounded-xl  ' />
                  <Skeleton className=' bg-zinc-300 dark:bg-zinc-800 ml-4 h-[50px] w-[100px] md:h-[75px] py-2 rounded-xl  ' />
                  <Skeleton className=' bg-zinc-300 dark:bg-zinc-800 ml-4 h-[50px] w-[100px] md:h-[75px] py-2 rounded-xl  ' />
                  <Skeleton className=' bg-zinc-300 dark:bg-zinc-800 ml-4 h-[50px] w-[100px] md:h-[75px] py-2 rounded-xl  ' />
                </div>
              ) : (
                <div className=''>
                  <Card className='rounded-xl h-[35%] py-2 dark:bg-mainDark'>
                    <CardContent className='flex flex-row -ml-5 flex-wrap'>
                      {error ? (
                        <p className='text-red-500'>{error.message}</p>
                      ) : (
                        parseMessages(completion).map((message, index) =>
                          showModal ? (
                            <CardContent
                              key={index}
                              className='rounded-xl text-left max-w-[200px] px-3 py-3 bg-red-300 m-2 dark:bg-red-400 hover:bg-accentLight dark:hover:bg-accentDark text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                              You&apos;ve reached the limit . Message khud likho
                              ab!
                            </CardContent>
                          ) : (
                            <CardContent
                              key={index}
                              onClick={() => handleMessageClick(message)}
                              style={{
                                backgroundImage: 'linear-gradient(25deg, #060031FF 10%, #4EB7AC 100%)',
                              }}
                              className='rounded-xl cursor-pointer text-left max-w-[200px] px-3 py-3 text-white m-2 transform transition duration-300 hover:scale-105 hover:bg-accentLight dark:hover:bg-accentDark text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                              {message}
                            </CardContent>
                          )
                        )
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          <div className='flex md:hidden dark:border-[0.5px] border-neutral-600 items-center bg-green-100 rounded-3xl mt-0 p-6 dark:bg-mainDark w-[100%]'>
            <p className='mx-4 text-2xl'>Get your Sameeksha handle</p>
            <Link href='https://sameeksha.vercel.app' passHref  target="_blank" rel="noopener noreferrer">
              <Button
                type='button'
                variant='secondary'
                className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Here
              </Button>
            </Link>
          </div>
        </div>

        {/* illustration section */}
        <div className='flex  flex-col'>
          {/* illustration */}
          <div  style={{
    backgroundImage: 'linear-gradient(30deg, #060031FF 0%, #4EB7AC 100%)',
  }} className=' -ml-64 rounded-3xl dark:border-[0.5px] border-neutral-600 hidden md:block'>
            <Image
              src={"https://illustrations.popsy.co/amber/communication.svg"}
              alt='send message illustration'
              width={400}
              height={600}></Image>
          </div>
          {/* get your link section */}
          <div className='md:flex items-center mt-5 hidden dark:border-[0.5px] border-neutral-600 bg-green-100 rounded-3xl p-6 dark:bg-mainDark w-[100] -ml-64'>
            <p className='mx-4 text-2xl'>Get your Sameeksha handle</p>
            <Link href='https://sameeksha.vercel.app' passHref  target="_blank" rel="noopener noreferrer">
              <Button
                type='button'
                variant='secondary'
                className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
