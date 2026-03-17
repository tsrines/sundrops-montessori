'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export interface AdminContext {
  campus: string;
  program: string;
  classroom: string;
  setCampus: (value: string) => void;
  setProgram: (value: string) => void;
  setClassroom: (value: string) => void;
}

export function useAdminContext(): AdminContext {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const campus = searchParams.get('campus') ?? '';
  const program = searchParams.get('program') ?? '';
  const classroom = searchParams.get('classroom') ?? '';

  const buildUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [searchParams, pathname],
  );

  const setCampus = useCallback(
    (value: string) => {
      router.push(buildUrl({ campus: value, program: '', classroom: '' }));
    },
    [router, buildUrl],
  );

  const setProgram = useCallback(
    (value: string) => {
      router.push(buildUrl({ program: value, classroom: '' }));
    },
    [router, buildUrl],
  );

  const setClassroom = useCallback(
    (value: string) => {
      router.push(buildUrl({ classroom: value }));
    },
    [router, buildUrl],
  );

  return { campus, program, classroom, setCampus, setProgram, setClassroom };
}
