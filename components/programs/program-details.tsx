interface ProgramDetailsProps {
  extendedDescription?: string;
}

export function ProgramDetails({ extendedDescription }: ProgramDetailsProps) {
  if (!extendedDescription) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="text-lg leading-relaxed text-muted-foreground">{extendedDescription}</p>
      </div>
    </section>
  );
}
