'use client'

import { useEffect } from 'react'

/**
 * GSAP-powered hero animations.
 *
 * GSAP and ScrollTrigger are imported dynamically to ensure they're bundled
 * with the component and available before useGSAP fires.
 *
 * 1. Convergence lines: stroke-dashoffset draw-in, staggered 80ms, 1s each
 * 2. Central node: scale + opacity breath, 6s loop, infinite
 * 3. Scroll-triggered reveals: cards fade up as they enter viewport
 */
export function HeroAnimation() {
  useEffect(() => {
    let cancelled = false

    async function init() {
      const [gsapModule, gsapReactModule] = await Promise.all([
        import('gsap'),
        import('@gsap/react'),
      ])

      if (cancelled) return

      const { default: gsap } = gsapModule
      const { useGSAP } = gsapReactModule
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(useGSAP, ScrollTrigger)

      /* ── 1. Convergence Node — line draw sequence ── */
      const lines = gsap.utils.toArray<SVGLineElement>('.convergence-line line')

      if (lines.length > 0) {
        const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } })
        tl.set(lines, { strokeDasharray: 1000, strokeDashoffset: 1000 })

        lines.forEach((line, i) => {
          tl.to(line, { strokeDashoffset: 0 }, i * 0.08)
        })

        // Pulse node glow at end
        tl.to('.node-pulse circle:first-child', { attr: { r: 10 }, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
          .to('.node-pulse circle:first-child', { attr: { r: 6 }, opacity: 0.8, duration: 0.8, ease: 'power2.inOut' })
      }

      /* ── 2. Node breathing pulse — infinite loop ── */
      gsap.to('.node-pulse circle:first-child', {
        attr: { r: 8 },
        opacity: 1,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.0,
      })

      /* ── 3. Outer ring subtle glow pulse ── */
      gsap.to('.node-ring', {
        opacity: 0.15,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.0,
      })

      /* ── 4. Scroll-triggered card reveals ── */
      ScrollTrigger.batch('[data-reveal-card]', {
        onEnter: (elements) => {
          gsap.fromTo(elements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' })
        },
        start: 'top 85%',
        once: true,
      })
    }

    // Small delay to ensure SVG is painted in DOM
    const timer = setTimeout(() => {
      init()
    }, 100)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return null
}
