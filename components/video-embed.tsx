'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface VideoEmbedProps {
  videoId: string;
  provider: 'vimeo' | 'youtube';
  title?: string;
  className?: string;
}

function buildSrc(provider: 'vimeo' | 'youtube', videoId: string): string {
  if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${videoId}?dnt=1`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function VideoEmbed({ videoId, provider, title, className }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    const currentRef = iframeRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const src = buildSrc(provider, videoId);

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg', className)}>
      <div className="aspect-video">
        {isLoaded ? (
          <iframe
            src={src}
            title={title ?? `${provider} video`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        ) : (
          <div
            ref={iframeRef}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted"
            aria-label="Video loading">
            <div className="text-sm text-muted-foreground">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  );
}
