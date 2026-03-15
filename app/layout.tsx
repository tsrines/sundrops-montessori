import type { Metadata, Viewport } from 'next';
import { Noto_Serif, Raleway, Sacramento } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { SearchDialog } from '@/components/search-dialog';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const sacramento = Sacramento({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sacramento',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sundrops Montessori | Authentic Montessori Education in Charleston, SC',
  description:
    'Authentic Montessori education for children ages 6 weeks through 9th grade in the greater Charleston, SC area. Nurturing the whole child through individualized, hands-on learning.',
  openGraph: {
    title: 'Sundrops Montessori | Authentic Montessori Education in Charleston, SC',
    description:
      'Authentic Montessori education for children ages 6 weeks through 9th grade in the greater Charleston, SC area.',
    url: 'https://sundropsmontessori.com',
    siteName: 'Sundrops Montessori',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#2EA3F2',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${raleway.variable} ${sacramento.variable} font-sans`}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <SearchDialog />
      </body>
    </html>
  );
}
