"use client"

import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(""); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          let message=response.data.message
          setUsernameMessage(message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          
          

          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
          
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your sign-up. Please try again.");

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };
  if (typeof window === 'undefined'){
    return null
}
  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark min-h-screen">
      <div className="md:px-14 md:py-7">
     <div className="flex md:dark:border-[0.5px] border-neutral-600 md:rounded-3xl flex-row items-center md:p-10 justify-around bg-white dark:bg-mainDark w-full ">
        <div className="bg-purple-100 dark:bg-accentDark max-w-[400px]   rounded-xl  hidden md:block">
<Image src={"https://illustrations.popsy.co/amber/working-vacation.svg"} alt="signup illustration" width={600} height={900}></Image>
        </div>

     <div className='flex justify-end w-[100%] md:w-[50%]  min-h-screen md:min-h-[80%] bg-white   rounded-3xl dark:bg-mainDark'>
      <div className='w-full mt-8 md:mt-0 max-w-md md:p-4 p-4 space-y-8 bg-orange-100 md:bg-transparent md:dark:border-0 dark:border-[0.5px] border-neutral-600 dark:bg-mainDark rounded-t-3xl   dark:text-textDark'>
        <div className='text-center md:text-right'>
          <h1 className='text-4xl font-semibold tracking-tight lg:text-5xl mb-6'>
            Join sameeksha
          </h1>
          <p className='mb-4'>Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              name='username'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                    placeholder='Username' className=" bg-transparent dark:bg-mainDark  rounded-lg    border-textDark"
                  />
                  {isCheckingUsername && <Loader2 className='animate-spin' />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}>
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Email</FormLabel>
                  <Input {...field} name='email' placeholder='Email' className=" bg-transparent dark:bg-mainDark rounded-lg  border-textDark" />
                  <p className='text-muted  text-sm'>
                    we will send you a verification code
                  </p>
                  <FormMessage />
                </FormItem>
              )}
              
            />

            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Password</FormLabel>
                  <Input type='password' {...field} name='password'placeholder='Password' className=" bg-transparent dark:bg-mainDark rounded-lg    border-textDark" />
                  <FormMessage />
                </FormItem>
              )}
              
            />
            <Button type='submit' className='w-full md:w-[40%] md:ml-[250px] rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  One Moment
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className='text-center md:hidden md:text-right mt-4'>
          <p>
            Already a member?{" "}
            <Link href='/sign-in' className='text-blue-600 hover:text-blue-800'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
      </div>
      </div>
      </div>
   
  );
}
