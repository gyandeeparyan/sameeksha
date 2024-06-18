import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'समीक्षा | Auth',
  description: 'Auth route',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
     <>
       <><Navbar/>{children}</>
     </>
    
    
  )
}
