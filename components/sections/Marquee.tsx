const words = [
  "Residences",
  "Penthouses",
  "Country Estates",
  "Pied-à-terre",
  "Private Members’ Spaces",
  "Collectors’ Homes",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="flex items-center gap-12">
          <span className="font-serif text-[clamp(1.9rem,3.4vw,3.25rem)] whitespace-nowrap text-ivory italic">{w}</span>
          <span className="size-[7px] shrink-0 rotate-45 bg-gold" />
        </span>
      ))}
    </div>
  );
}

/** Slow, infinite CSS marquee of specialisms. */
export function Marquee() {
  return (
    <section aria-label="Specialisms" className="overflow-hidden border-b border-ivory/8 py-11">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
