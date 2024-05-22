"use client"

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton"

import { useSession,signOut } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";

import MessageCard from "@/components/MessageCard";
import Link from "next/link";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();



 

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        console.log(response.data.messages)
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ?? "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

 


  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;
  //TODO: MORE Research on how to get urls
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    function copyTextToClipboard(text:string) {
      if (!navigator.clipboard) {
        // Fallback for browsers that don't support the Clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return Promise.resolve();
      }
    
      return navigator.clipboard.writeText(text);
    }
    
    copyTextToClipboard(profileUrl)
      .then(() => {
        toast({
          title: "URL Copied!",
          description: "Profile URL has been copied to clipboard.",
        });
      })
      .catch((error) => {
  
        console.error("Error copying URL to clipboard:", error);
        toast({
          title: "Error",
          description: "Failed to copy URL to clipboard.",
         
        });
      });
  };


if (typeof window === 'undefined'){
    return null
}

  return (


    <div className='container flex  flex-col md:flex md:flex-row  justify-around    bg-backgroundLight dark:bg-backgroundDark h-screen  w-full'>
      {/* message section */}
      <div className='flex  justify-center items-center md:w-[50%] flex-col'>
        {/* messages list container */}
        <div className='bg-indigo-100  overflow-y-scroll h-[50%] text-wrap text-textLight dark:text-textDark dark:bg-mainDark w-full md:w-full p-6  rounded-3xl '>
          <div className="flex flex-row items-center ">
          <Button
            className='mt-4 px-2  bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark text-textLight dark:text-textDark  rounded-full'
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}>
            {isLoading ? (
              <Loader2 className='w-6  text-textLight  h-6  animate-spin hover:text-textLight ' />
            ) : (
              <RefreshCcw className='w-6  text-textLight h-6  hover:text-textLight' />
            )}
          </Button>
          {session ? (
            <Button
              variant='secondary'
              className='rounded-xl mt-4  ml-3 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
              type='button'
              onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Link href='/sign-in'>
              <Button
                type='button'
                variant='secondary'
                className='rounded-xl mt-4 ml-3 bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                Login
              </Button>
            </Link>
          )}
          </div>
         
          <h1 className='text-5xl font-semibold mb-6 text-left'>
            namaste  {username} .
          </h1>
          <div className='mt-4  flex flex-col w-[90%] '>
            {messages.length > 0 ? (
              messages.map((message, index) => {
             
             return ( <MessageCard
                
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              )
             })): (
              
                isSwitchLoading?(  <div className="flex flex-col w-[100%] space-y-3">
                <Skeleton className=" bg-stone-300 dark:bg-zinc-800  rounded-xl overflow-y-scroll h-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]  rounded-xl" />
                  <Skeleton className="h-4 w-[200px] rounded-xl" />
                </div>
              </div>):( <p>No messages to display.</p>)
              
             
            )}
          </div>
        </div>
        {/*copy section/}
        {/*--------------------------------------------------------------------------------------------------------------------  */}

        <div className='bg-orange-100  my-6 dark:bg-mainDark flex flex-col w-full md:w-[100%]  p-5 rounded-3xl'>
          <div className='space-y-4  text-left'>
            {/* copy section */}
            <h2 className='text-lg font-semibold mb-2'>
              Copy Your Unique Link
            </h2>{" "}
            <div className='flex items-center'>
              <input
                title='switch'
                type='text'
                value={profileUrl}
                disabled
                className='input input-bordered border rounded-full border-textLight dark:border-textDark w-full p-2 mr-2 bg-mainLight dark:bg-mainDark'
              />
              <Button
                className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                onClick={copyToClipboard}>
                copy
              </Button>
            </div>
           
          </div>
        </div>

        {/* mobile version of settings /prefrences */}
        <div className='flex md:hidden items-center bg-cyan-100 rounded-3xl p-6 dark:bg-mainDark    '>
        <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className='ml-2'>
              Accept Messages: {acceptMessages ? "On" : "Off"}
            </span>
        </div>

        

      
      </div>
        {/* illustration section */}
        <div className='flex ml-32 flex-col'>
          {/* illustration */}
          <div className='bg-indigo-100 dark:bg-accentDark  -ml-64 rounded-3xl my-6 hidden md:block'>
            <Image
              src={"https://illustrations.popsy.co/amber/home-office.svg"}
              alt='send message illustration'
              width={400}
              height={600}></Image>
          </div>
          {/* setting / prefrence section */}
          <div className='md:flex bg-cyan-100 items-center hidden bg-mainLight rounded-3xl p-6 dark:bg-mainDark w-[280%] -ml-64  '>
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className='ml-2'>
              Accept Messages: {acceptMessages ? "On" : "Off"}
            </span>
          </div>
        </div>
    </div>
  );
}

export default UserDashboard;
