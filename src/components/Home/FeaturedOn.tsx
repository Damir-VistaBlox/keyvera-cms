const brands: { name: string; font: string; weight: string; color: string; tracking?: string }[] = [
  { name: 'TechCrunch', font: "'Inter', sans-serif", weight: '700', color: '#0A9E01' },
  { name: 'Wired', font: "'Inter', sans-serif", weight: '800', color: '#ffffff' },
  { name: 'Forbes', font: "Georgia, 'Times New Roman', serif", weight: '700', color: '#ffffff' },
  { name: 'Bloomberg', font: "Arial, Helvetica, sans-serif", weight: '700', color: '#ffffff' },
]

/**
 * CSS-only infinite scroll carousel.
 * Renders the brand set twice so the loop is seamless (no gap on wrap).
 */
export default function FeaturedOn() {
  return (
    <section
      className="border-b border-white/[0.08] bg-[#000020] py-6"
      aria-label="As featured on"
    >
      <div className="container">
        <p className="mb-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/25">
          As featured on
        </p>

        {/* Edge-fade mask + overflow clip */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="animate-featured-scroll flex w-max gap-16 px-8">
            {/* Set A */}
            {brands.map((b, i) => (
              <div key={`a${i}`} className="flex h-8 shrink-0 items-center">
                <span
                  className="text-base leading-none whitespace-nowrap select-none"
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

            {/* Set B — duplicate for seamless loop */}
            {brands.map((b, i) => (
              <div key={`b${i}`} className="flex h-8 shrink-0 items-center">
                <span
                  className="text-base leading-none whitespace-nowrap select-none"
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
      </div>
    </section>
  )
}
