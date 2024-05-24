import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Sameeksha | Auth',
  description: 'Auth route',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
     <head/>
      <body> <Navbar/>{children}</body>
    </html>
  )
}
