import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { SearchDialogWrapper } from './search-dialog-wrapper';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <SearchDialogWrapper />
    </>
  );
}
