import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from './providers'
import ThemeSwitcher from './ThemeSwitcher'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pandora",
  description: "Unlocking Infinite Possibilities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-[#0a0c0f]`}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
