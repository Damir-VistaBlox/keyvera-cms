const brands = [
  { name: 'TechCrunch', font: "'Inter', sans-serif", weight: '700', color: '#0A9E01' },
  { name: 'Wired', font: "'Inter', sans-serif", weight: '800', color: '#ffffff', tracking: '-0.04em' },
  { name: 'Forbes', font: "Georgia, 'Times New Roman', serif", weight: '700', color: '#ffffff' },
  { name: 'Bloomberg', font: "Arial, Helvetica, sans-serif", weight: '700', color: '#ffffff' },
]

export default function FeaturedOn() {
  return (
    <section className="border-b border-white/[0.08] bg-[#000020] py-6" aria-label="As featured on">
      <div className="container">
        <p className="mb-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/25">
          As featured on
        </p>
        <div className="flex items-center justify-center gap-10 sm:gap-14 flex-wrap">
          {brands.map((b, i) => (
            <div key={i} className="flex h-8 shrink-0 items-center">
              <span
                className="text-base leading-none whitespace-nowrap"
                style={{
                  fontFamily: b.font,
                  fontWeight: b.weight,
                  color: b.color,
                  letterSpacing: b.tracking || 'normal',
                  opacity: 0.6,
                }}
              >
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
