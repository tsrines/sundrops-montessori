'use client';

import dynamic from 'next/dynamic';

const SearchDialogDynamic = dynamic(
  () => import('@/components/search-dialog').then((m) => m.SearchDialog),
  { ssr: false }
);

export function SearchDialogWrapper() {
  return <SearchDialogDynamic />;
}
