import dynamic from 'next/dynamic';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const SearchDialog = dynamic(() => import('@/components/search-dialog').then((m) => m.SearchDialog), { ssr: false });

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <SearchDialog />
    </>
  );
}
