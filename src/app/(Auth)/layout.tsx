import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <head/>
      <body> <Navbar/>{children}<Footer/></body>
    </html>
  )
}
