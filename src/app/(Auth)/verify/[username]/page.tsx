"use client"

import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
   
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("Invalid OTP. Please try again.");

      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (typeof window === 'undefined'){
    return null
}

  return (

    <div className="bg-backgroundLight dark:bg-backgroundDark min-h-screen">
         <div className="md:px-14 md:py-7 px-4">
    <div className="flex md:dark:border-[0.5px] border-neutral-600 bg-white rounded-3xl md:p-10  dark:bg-mainDark flex-row items-center justify-around">
       <div className="bg-purple-100 max-w-[400px] dark:bg-accentDark  rounded-xl hidden md:block">
<Image src={"https://illustrations.popsy.co/amber/telephone-call.svg"} alt="verify code illustration" width={400} height={600}></Image>
       </div>

    
    <div className='flex justify-end w-[100%] md:w-[50%]  min-h-screen md:min-h-[80%] bg-white   rounded-3xl dark:bg-mainDark'>
      <div className='w-full mt-8 md:mt-0 max-w-md md:p-4 p-4  space-y-8  bg-orange-100 md:bg-transparent md:dark:border-0 dark:border-[0.5px] border-neutral-600 dark:bg-mainDark rounded-3xl   dark:text-textDark'>
        <div className='text-center md:text-right'>
          <h1 className='text-4xl font-semibold tracking-tight lg:text-5xl mb-6'>
            Verify Your Account
          </h1>
          <p className='mb-4'>Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              name='code'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Verification Code</FormLabel>
                  <Input {...field} placeholder='6 digit code sent on email' className=" bg-transparent dark:bg-mainDark  rounded-lg    border-textDark" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full md:w-[40%] md:ml-[250px] rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>verify</Button>
          </form>
        </Form>
      </div>
    </div>
    </div>
    </div>
      </div>
  );
}

export default VerifyAccount;
