"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Cryptr from "cryptr";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";

import MessageCard from "@/components/MessageCard";
import Link from "next/link";
import { Label } from "@/components/ui/label";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
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
        console.log(response.data.messages);
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
 
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}${
    feedbackType ? `?utm_feedback_type=${encodeURIComponent(feedbackType)}` : ""
  }`;

  const SECRET_KEY = String(process.env.CRYPTOJS_SECRET);
  const cryptr = new Cryptr(SECRET_KEY, {
    encoding: "base64",
    pbkdf2Iterations: 10000,
    saltLength: 10,
  });
  const decryptContent = (encryptedContent: string): string => {
    try {
      console.log(encryptedContent);
      const decryptedContent = cryptr.decrypt(encryptedContent);
      console.log(decryptedContent);
      if (!decryptedContent) throw new Error("Decryption failed");
      return decryptedContent;
    } catch (error) {
      console.error("Decryption error:", error);
      return "Decryption failed";
    }
  };

  const copyToClipboard = () => {
    function copyTextToClipboard(text: string) {
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

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className=' flex  flex-col md:flex md:flex-row  mt-5 md:mt-0 justify-around    bg-backgroundLight dark:bg-backgroundDark h-screen px-4 w-full'>
      {/* message section */}
      <div className='flex  md:justify-center items-center md:w-[50%] flex-col '>
        {/* messages list container */}
        <div className='bg-indigo-100  dark:border-[0.5px] border-neutral-600 overflow-y-scroll grow-0 h-[50%] text-wrap text-textLight dark:text-textDark dark:bg-mainDark w-full md:w-full p-6  rounded-3xl '>
          <div className='flex flex-row items-center mb-4 '>
            <Button
              className='mt-4 px-2  bg-highlightLight dark:bg-highlightLight hover:bg-accentLight dark:hover:bg-accentDark text-textLight dark:text-textDark  rounded-full'
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
            Namaste {username} .
          </h1>
          <div className='mt-4  flex flex-col w-[90%] '>
            {messages.length > 0 ? (
              messages.map((message, index) => {
                console.log(message);
                let decryptedMessage = decryptContent(message.content);
                console.log(message.content);
                
                console.log(decryptedMessage);
                return (
                  <MessageCard
                    key={message._id}
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
                );
              })
            ) : isSwitchLoading ? (
              <div className='flex flex-col w-[100%] space-y-3'>
                <Skeleton className=' bg-zinc-300 dark:bg-zinc-800  rounded-xl overflow-y-scroll h-32' />
              </div>
            ) : (
              <p>No messages to display.</p>
            )}
          </div>
        </div>
        {/*copy section/}
        {/*--------------------------------------------------------------------------------------------------------------------  */}

<div className='bg-orange-100 dark:border-[0.5px] border-neutral-600 my-6 dark:bg-mainDark flex flex-col w-full md:w-[100%] p-5 rounded-3xl'>
        <div className='space-y-4 text-left'>
          <h2 className='text-lg font-semibold mb-2'>
            Copy Your Unique Link
          </h2>
          <div className='flex flex-col space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor="feedbackType"></Label>
              <input
                id="feedbackType"
                aria-label="Feedback Type"
                placeholder="enter feedback type(bug-report, feature-request)"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="rounded-full input-bordered border w-full p-2 bg-mainLight dark:bg-mainDark border-textLight dark:border-textDark"
              />
            </div>
            <div className='flex items-center'>
              <input
                title='switch'
                type='text'
                value={profileUrl}
                disabled
                className='input  input-bordered border rounded-full border-textLight dark:border-textDark w-full p-2 mr-2 bg-mainLight dark:bg-mainDark'
              />
              <Button
                className='rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark px-7 text-sm font-semibold text-textLight dark:textDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* mobile version of settings /prefrences */}
        <div className='flex md:hidden items-center dark:border-[0.5px] border-neutral-600 bg-cyan-100 rounded-3xl p-6 dark:bg-mainDark    '>
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
      <div className='flex md:justify-center md:-mt-8 md:-ml-40 flex-col'>
        {/* illustration */}
        <div className='bg-indigo-100 dark:bg-accentDark   rounded-3xl mb-6 hidden md:block'>
          <Image
            src={"https://illustrations.popsy.co/amber/home-office.svg"}
            alt='send message illustration'
            width={350}
            height={300}></Image>
        </div>
        {/* setting / prefrence section */}
        <div className='md:flex bg-cyan-100 dark:border-[0.5px] border-neutral-600  items-center hidden bg-mainLight rounded-3xl p-6 dark:bg-mainDark    '>
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
