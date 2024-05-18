import type { Metadata } from "next";
import { Inter, Roboto_Mono ,Dancing_Script} from 'next/font/google'
 

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sameeksha",
  description: "Generated by create next app",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

 

 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
const junge = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  weight:'400',
  variable: '--font-junge',
})
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={` ${roboto_mono.variable} ${junge.variable}`}>
      <AuthProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <body className={inter.className}>
          
          {children}
          <Toaster />
        </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}