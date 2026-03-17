interface ApplicationSectionProps {
  number: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ApplicationSection({ number, title, description, children }: ApplicationSectionProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-2 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {number}
        </span>
        <span className="text-xl font-semibold text-foreground">{title}</span>
      </legend>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </fieldset>
  );
}
