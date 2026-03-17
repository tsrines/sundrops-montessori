import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { SearchDialog } from '@/components/search-dialog';

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
