import type { Metadata } from "next";
import { Inter, Roboto_Mono ,Dancing_Script} from 'next/font/google'
 

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"

import AuthProvider from "@/context/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sameeksha",
  description: "Anonymous messaging platform built with Next.js 14",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

 

 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={` ${roboto_mono.variable} `} suppressHydrationWarning>
      <head />
      
        
          
          <body className={inter.className}>
         
            
            <AuthProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
       
        >
            {children}
            
            </ThemeProvider>
            </AuthProvider>
            <Toaster />
           
          </body>
       
        
     
    </html>
  );
}

export default RootLayout;