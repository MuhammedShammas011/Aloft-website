import { home } from '@aloft/content';
import { ProjectList } from '@/components/sections/ProjectList';
import { SectionHeader } from '@/components/ui/SectionHeader';

const FEATURED_SLUGS = [
  'hyper-budget',
  'bridgeon-calicut',
  'okaz-cinemas-kaithachira',
] as const;

/** Section 8 — three featured case studies on the home page. */
export function ShowcaseSection() {
  return (
    <section aria-labelledby="showcase-title" className="section">
      <div className="container-page">
        <SectionHeader id="showcase-title" {...home.showcase} />
        <div className="mt-12 md:mt-16">
          <ProjectList slugs={FEATURED_SLUGS} />
        </div>
      </div>
    </section>
  );
}
