import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
