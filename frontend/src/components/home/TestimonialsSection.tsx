'use client';

import { Reveal } from '@/components/ui/Reveal';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'The coordination between design and installation was seamless. Our three-floor office was commissioned on schedule with no disruption to the fit-out work.',
    name: 'Jabir Ismail',
    role: 'CEO, Bridgeon Skillversity — Calicut',
  },
  {
    quote:
      'ALOFT understood the complexity of a large retail floor plan from day one. Their team delivered exactly what was needed without overcomplicating the process.',
    name: 'Operations Manager',
    role: 'Hyper Budget Supermarket — Malappuram',
  },
  {
    quote:
      'We needed a system that could handle the demands of a cinema environment. The outcome exceeded what we had specified in our initial brief.',
    name: 'Facility Head',
    role: 'Okaz Cinemas — Kaithachira',
  },
];

/** Section — Client testimonials. Minimal ruled layout matching site theme. */
export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="section bg-white">
      <div className="container-page">
        {/* Header */}
        <Reveal>
          <div className="flex items-end justify-between border-b border-petrol/15 pb-7">
            <div>
              <span className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-supply">
                Client testimonials
              </span>
              <h2
                id="testimonials-title"
                className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-petrol sm:text-[2rem]"
              >
                Heard from our clients
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Testimonial rows */}
        <ul className="divide-y divide-petrol/10">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <li className="group grid gap-6 py-8 sm:grid-cols-[1fr_auto] sm:items-start md:gap-12 md:py-10">
                {/* Quote */}
                <blockquote>
                  {/* Large open-quote mark */}
                  <span
                    aria-hidden="true"
                    className="block font-serif text-[2.5rem] leading-none text-supply/25 select-none -mb-2"
                  >
                    &ldquo;
                  </span>
                  <p className="text-[1.0625rem] leading-[1.7] text-petrol sm:text-[1.125rem]">
                    {t.quote}
                  </p>
                </blockquote>

                {/* Attribution — right-aligned on sm+ */}
                <footer className="shrink-0 sm:text-right">
                  <p className="text-[0.9375rem] font-semibold text-petrol">{t.name}</p>
                  <p className="mt-0.5 text-[0.8125rem] text-muted">{t.role}</p>
                </footer>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
