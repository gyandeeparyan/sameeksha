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
     <div className="flex flex-row items-center justify-around  ">
        <div className="bg-indigo-100 dark:bg-accentDark mx-5 mb-10 rounded-3xl mt-20 hidden md:block">
<Image src={"https://illustrations.popsy.co/amber/home-from-work.svg"} alt="signin illustration" width={400} height={600}></Image>
        </div>
    <div className="flex justify-center min-h-screen md:min-h-[80%] bg-backgroundLight dark:bg-backgroundDark">
      <div className="w-full mt-8 max-w-md p-8 space-y-8 bg-orange-100 dark:bg-mainDark rounded-2xl shadow-md text-textLight dark:text-textDark">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-6">
            welcome back to sameeksha
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
                  <Input {...field}  placeholder='Username / Email' className=" bg-transparent dark:bg-mainDark border-t-transparent border-l-transparent border-r-transparent   border-b-textDark" />
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
                  <Input type="password" {...field}  placeholder='Password' className=" bg-transparent dark:bg-mainDark border-t-transparent border-l-transparent border-r-transparent   border-b-textDark"/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full rounded-full bg-buttonLight dark:bg-buttonDark hover:bg-accentLight dark:hover:bg-accentDark  px-7  text-sm font-semibold text-textLight  dark:textDark shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
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
  );
}