interface CampusMapProps {
  mapEmbedUrl: string;
  campusName: string;
}

export function CampusMap({ mapEmbedUrl, campusName }: CampusMapProps) {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold tracking-tight text-foreground">Find Us</h2>
        <div className="aspect-video overflow-hidden rounded-xl border shadow-md">
          <iframe
            src={mapEmbedUrl}
            title={`Map of ${campusName}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
