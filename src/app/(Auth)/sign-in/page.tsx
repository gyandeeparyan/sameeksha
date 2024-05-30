"use client"

import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  if (typeof window === 'undefined'){
    return null
}
  return (

    <div className="bg-backgroundLight dark:bg-backgroundDark min-h-screen">
      <div className="md:px-14 md:py-7">
     <div className="flex md:dark:border-[0.5px] border-neutral-600 bg-white rounded-3xl md:p-10  dark:bg-mainDark flex-row items-center justify-around  ">
        <div className="bg-purple-100 max-w-[400px] dark:bg-accentDark  rounded-xl hidden md:block">
<Image src={"https://illustrations.popsy.co/amber/home-from-work.svg"} alt="signin illustration" width={400} height={600}></Image>
        </div>
    <div className="flex justify-end w-[100%] md:w-[50%]  min-h-screen md:min-h-[80%] bg-white   rounded-3xl dark:bg-mainDark">
      <div className="w-full mt-8 md:mt-0 max-w-md md:p-4 p-4  space-y-8  bg-orange-100 md:bg-transparent md:dark:border-0 dark:border-[0.5px] border-neutral-600 dark:bg-mainDark rounded-3xl   dark:text-textDark">
        <div className="text-center md:text-right">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-6">
            Welcome back to sameeksha
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Email/Username</FormLabel>
                  <Input {...field}  placeholder='Username / Email' className=" bg-transparent dark:bg-mainDark  rounded-lg    border-textDark" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Password</FormLabel>
                  <Input type="password" {...field}  placeholder='Password' className=" bg-transparent dark:bg-mainDark  rounded-lg    border-textDark"/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full md:w-[40%] md:ml-[250px] rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-end mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
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