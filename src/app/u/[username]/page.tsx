"use client"

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
import { Skeleton } from "@/components/ui/skeleton"
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
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import Image from "next/image";

const separator = "||";

const parseMessages = (messageString: string): string[] => {
  return messageString.split(separator);
};

const defaultMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

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

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

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
    try {
      setIsLoading(true)
      complete("");
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Error fetching messages",
        variant: "destructive",
      });
    }
    finally{
      setIsLoading(false)
    }
  };

  if (typeof window === 'undefined'){
    return null
}

  return (
    <div className='container flex flex-col md:flex md:flex-row  justify-around    bg-backgroundLight dark:bg-backgroundDark h-full  w-full'>
      {/* message section */}
      <div className='flex my-6 flex-col'>
        {/* message box */}
        <div className='bg-orange-100 text-wrap dark:bg-mainDark w-full md:w-[75%] p-6  rounded-3xl '>
          <h1 className='text-4xl  font-bold mb-6 text-left'>
            namaste from {username}.
            <p className='mt-3 md:mt-5 text-base md:text-lg md:w-[250px]'>
              unleash your thoughts, send anything anonymously!
            </p>
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='hidden'>
                      Send Anonymous Message to @{username}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='aapke vichaar? yahan likhiye!'
                        className='resize-none bg-mainLight border border-transparent rounded-xl dark:bg-mainDark border-t-textDark border-l-textDark border-r-textDark   border-b-textDark'
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
                    className='w-full rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    please wait
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    className='w-full rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                    disabled={isLoading || !messageContent}>
                    send
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
        {/*message suggestions box*/}
        {/*--------------------------------------------------------------------------------------------------------------------  */}

        <div className='bg-indigo-100 h-[22%]  my-6 dark:bg-mainDark flex flex-col w-full md:w-[75%]  p-5 rounded-3xl'>
          <div className='space-y-4 overflow-y-scroll text-left'>
            {/* sugeestions button */}

            <div className='ml-5 '>
              {/* generate button */}

              <Button
                onClick={fetchSuggestedMessages}
                className=' rounded-full bg-highlightLight flex items-center dark:bg-highlightDark hover:bg-accentLight dark:hover:bg-accentLight  px-4  text-sm font-semibold text-textLight   shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                disabled={isSuggestLoading}>
                <span className='mx-2'>
                  <Sparkles />
                </span>
                ask sameeksha
              </Button>
            </div>

            {isSuggestLoading?(<div className="flex flex-row gap-2 flex-wrap w-[100%]">
                <Skeleton className=" bg-zinc-300 dark:bg-zinc-800 ml-4 h-[200px] w-[100px] py-2 rounded-xl  " />
                <Skeleton className=" bg-zinc-300 dark:bg-zinc-800 ml-4 h-[200px] w-[100px] py-2 rounded-xl  " />
                <Skeleton className=" bg-zinc-300 dark:bg-zinc-800 ml-4 h-[200px] w-[100px] py-2 rounded-xl  " />
                <Skeleton className=" bg-zinc-300 dark:bg-zinc-800 ml-4 h-[200px] w-[100px] py-2 rounded-xl  " />
              </div>):(<div className=''>
              <Card className='rounded-xl h-[30%] py-2  dark:bg-mainDark'>
                <CardContent className='flex flex-row -ml-5  flex-wrap'>
                  {error ? (
                    <p className='text-red-500'>{error.message}</p>
                  ) : (
                    parseMessages(completion).map((message, index) => (
                     
                        <CardContent
                         key={index}
                          onClick={() => handleMessageClick(message)}
                        className='rounded-xl text-left   max-w-[200px] px-3 py-3 bg-buttonLight m-2 dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark    text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                        {message}
                        </CardContent>
                      
                
                    ))
                  )}
                </CardContent>
              </Card>
            </div>)}
          </div>
        </div>

        <div className='flex md:hidden items-center bg-green-100 rounded-3xl p-6 dark:bg-mainDark w-[100%]   '>
          <p className='mx-4 text-2xl '>get your public url</p>
          <Link href='/sign-up'>
            <Button
              type='button'
              variant='secondary'
              className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
              here
            </Button>
          </Link>
        </div>
      </div>

      {/* illustration section */}
      <div className='flex flex-col'>
        {/* illustration */}
        <div className='bg-indigo-100 dark:bg-accentDark  -ml-64 rounded-3xl my-6 hidden md:block'>
          <Image
            src={"https://illustrations.popsy.co/amber/communication.svg"}
            alt='send message illustration'
            width={400}
            height={600}></Image>
        </div>
        {/* get your link section */}
        <div className='md:flex  items-center hidden bg-green-100 rounded-3xl p-6 dark:bg-mainDark w-[280%] -ml-64  '>
          <p className='mx-4 text-2xl '>get your public url</p>
          <Link href='/sign-up'>
            <Button
              type='button'
              variant='secondary'
              className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
              here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
