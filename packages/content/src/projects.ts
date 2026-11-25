/**
 * Project case studies, rendered statically by the website.
 *
 * Publish only verified, client-approved projects with real site photographs
 * (content draft, page 5). Until then the list stays empty and the site shows
 * an honest "case studies are being documented" state.
 *
 * To add one, append an object like this (images live in
 * frontend/public/images/projects/):
 *
 *   {
 *     slug: 'office-vrf-malappuram',
 *     title: 'VRF / VRV installation',
 *     summary: 'One-paragraph summary approved for publication.',
 *     buildingType: 'Commercial office',
 *     location: 'Malappuram, Kerala',
 *     system: 'VRF / VRV',
 *     capacity: null,                       // only if verified and approved
 *     servicesProvided: ['System selection', 'Refrigerant piping', 'Testing and commissioning'],
 *     serviceSlugs: ['vrf-vrv-systems'],
 *     challenge: 'The original requirement, constraints or documented issue.',
 *     solution: 'The selected system, engineering considerations and scope delivered.',
 *     execution: 'Installation and coordination work.',
 *     outcome: 'Measured or verifiable outcomes only.',
 *     images: [
 *       { url: '/images/projects/office-vrf-before.jpg', alt: '...', kind: 'before', width: 1600, height: 1200 },
 *       { url: '/images/projects/office-vrf-after.jpg', alt: '...', kind: 'after', width: 1600, height: 1200 },
 *     ],
 *     completedAt: '2026-03-01',
 *   },
 */

export type ProjectImageKind = 'cover' | 'before' | 'after' | 'gallery';

export interface ProjectImage {
  url: string;
  alt: string;
  kind: ProjectImageKind;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  buildingType: string;
  location: string;
  system: string;
  capacity: string | null;
  servicesProvided: string[];
  serviceSlugs: string[];
  challenge: string;
  solution: string;
  execution: string;
  outcome: string;
  images: ProjectImage[];
  completedAt: string | null;
}

export const projects: Project[] = [
  {
    slug: 'residence-pulamanthol',
    title: 'Residence, Pulamanthol',
    summary:
      'Centralized ducted split air conditioning installation for a neoclassical private residence in Pulamanthol, Kerala, designed to conceal indoor equipment above ceiling lines across living zones.',
    buildingType: 'Private residence',
    location: 'Pulamanthol, Kerala',
    system: 'Ducted split air conditioning',
    capacity: null,
    servicesProvided: [
      'Site survey and load estimation',
      'Duct-type indoor unit installation',
      'Concealed air distribution ductwork',
      'Testing and commissioning',
    ],
    serviceSlugs: ['hvac-ducting', 'hvac-design'],
    challenge:
      'The residence required quiet, uniform cooling that stayed concealed within the neoclassical interior ceiling architecture without visible wall-mounted units disrupting living spaces.',
    solution:
      'ALOFT deployed O General duct-type split indoor units coordinated with concealed supply and return plenums to match room ceiling heights and interior finishes.',
    execution:
      'Duct-type indoor units, insulated ductwork and refrigerant lines were coordinated during construction inside ceiling cavities, with pressure testing and commissioning prior to handover.',
    outcome:
      "Quiet, even cooling throughout the residence with HVAC equipment integrated cleanly behind the building's interior finishes.",
    images: [
      {
        url: '/images/projects/Grand White Neoclassical Villa Under Construction.png',
        alt: 'Grand white neoclassical villa under construction in Pulamanthol with ALOFT centralized air conditioning installation',
        kind: 'cover',
        width: 1672,
        height: 941,
      },
      {
        url: '/images/projects/WhatsApp Image 2026-11-10 at 11.01.47.jpeg',
        alt: 'O General duct-type indoor AC units delivered on site for the Pulamanthol residence installation by ALOFT',
        kind: 'gallery',
        width: 960,
        height: 1280,
      },
    ],
    completedAt: '2026-11-01',
  },
  {
    slug: 'bridgeon-calicut',
    title: 'Bridgeon, Calicut',
    summary:
      'Commercial centralized air conditioning and exposed architectural ducting installation for Bridgeon Skillversity in Calicut, covering training halls and office zones.',
    buildingType: 'Commercial office & training centre',
    location: 'Calicut, Kerala',
    system: 'Centralized ducted air conditioning',
    capacity: null,
    servicesProvided: [
      'Commercial HVAC design and system selection',
      'Exposed circular ductwork fabrication',
      'Air distribution and balancing',
      'Testing and commissioning',
    ],
    serviceSlugs: ['hvac-ducting', 'vrf-vrv-systems'],
    challenge:
      'The training facility required even cooling across high-occupancy classrooms and open workspaces while integrating overhead ductwork cleanly with the modern exposed-ceiling aesthetic.',
    solution:
      'Engineered a centralized ducted layout using circular overhead supply ducts with ceiling diffusers finished to complement the building palette, delivering balanced airflow across training zones.',
    execution:
      "Coordinated overhead circular ductwork, diffusers and indoor equipment alongside structural and interior contractors, with phased commissioning aligned to the client's soft-launch timeline.",
    outcome:
      'Comfortable working and learning environment across all zones, with balanced air distribution and integrated ceiling aesthetics ready for launch.',
    images: [
      {
        url: '/images/projects/Modern Office Building with Red Panels.png',
        alt: 'Modern office building exterior of Bridgeon Skillversity in Calicut with centralized HVAC air conditioning by ALOFT',
        kind: 'cover',
        width: 1672,
        height: 941,
      },
      {
        url: '/images/projects/The Soft Launch of Bridgeon Skillversity has taken place in Calicut, a milestone moment for tech (1).jpg',
        alt: 'Bridgeon Skillversity Calicut training hall featuring exposed red circular overhead HVAC ductwork and ceiling diffusers installed by ALOFT',
        kind: 'gallery',
        width: 4096,
        height: 2304,
      },
    ],
    completedAt: '2026-11-10',
  },
  {
    slug: 'hyper-budget',
    title: 'Hyper Budget',
    summary:
      'Commercial centralized cooling and multi-zone VRF installation for Hyper Budget commercial and retail facilities in Manjeri (Rajiv Gandhi Bypass Road) and Malappuram.',
    buildingType: 'Commercial complex',
    location: 'Manjeri (Rajiv Gandhi Bypass Road) & Malappuram, Kerala',
    system: 'VRF / VRV and ducted cooling',
    capacity: 'Multi-zone commercial setup',
    servicesProvided: [
      'System selection and configuration',
      'Refrigerant piping and indoor unit installation',
      'Air distribution ductwork',
      'Testing and commissioning',
    ],
    serviceSlugs: ['vrf-vrv-systems', 'hvac-ducting'],
    challenge:
      'The multi-storey facilities across Manjeri (Rajiv Gandhi Bypass Road) and Malappuram required independent temperature control across retail and office zones with high operating efficiency and quiet indoor sound levels.',
    solution:
      'ALOFT engineered multi-zone VRF configurations paired with ductable indoor fan coils, delivering balanced air distribution, zoned thermostat control and optimized outdoor unit placement.',
    execution:
      'Refrigerant piping, acoustic insulation, sheet-metal ductwork and indoor units were installed in tight coordination with ceiling frameworks and electrical services across both locations.',
    outcome:
      'Dependable climate control across all operational zones with responsive multi-zone temperature regulation and streamlined ongoing service access.',
    images: [
      {
        url: '/images/projects/hyper-budget-malappuram.webp',
        alt: 'Exterior facade and commercial building of Hyper Budget on Rajiv Gandhi Bypass Road, Manjeri, with centralized HVAC air conditioning',
        kind: 'cover',
        width: 1360,
        height: 928,
      },
      {
        url: '/images/project-hyper-budget-plaza.webp',
        alt: 'Hyper Budget Supermarket Plaza retail interior and air conditioning ductwork in Malappuram',
        kind: 'gallery',
        width: 1586,
        height: 992,
      },
    ],
    completedAt: '2025-11-15',
  },
  {
    slug: 'milan-cinemas-mannarkkad',
    title: 'Milan Cinemas, Mannarkkad',
    summary:
      'Centralized auditorium air conditioning and acoustic ventilation installation for Milan Cinemas in Mannarkkad, Palakkad.',
    buildingType: 'Cinema auditorium',
    location: 'Mannarkkad, Palakkad, Kerala',
    system: 'Centralized ducted cooling',
    capacity: 'High-capacity auditorium cooling',
    servicesProvided: [
      'Auditorium HVAC engineering',
      'Acoustic ductwork fabrication',
      'Airflow balancing',
      'Commissioning and testing',
    ],
    serviceSlugs: ['hvac-ducting', 'vrf-vrv-systems'],
    challenge:
      'Cinema auditoriums demand high cooling capacity for packed screenings under strict acoustic limits to prevent mechanical equipment noise from intruding into the movie experience.',
    solution:
      'Engineered a centralized air distribution layout with internally lined acoustic ductwork, low-velocity supply diffusers and strategically routed return air paths to keep noise criteria within cinema industry targets.',
    execution:
      'Installed heavy-gauge acoustic ducting, vibration isolation mountings for primary equipment, and precision dampers to ensure uniform air delivery across tiered auditorium seating.',
    outcome:
      'Comfortable, draft-free auditorium climate with ultra-quiet acoustic performance and uniform temperature distribution throughout the screening hall.',
    images: [
      {
        url: '/images/projects/milan-theatre-mannarkkad.webp',
        alt: 'Exterior facade of Milan Cinemas in Mannarkkad with central HVAC cooling installation',
        kind: 'cover',
        width: 1360,
        height: 1020,
      },
    ],
    completedAt: '2025-08-20',
  },
  {
    slug: 'okaz-cinemas-kaithachira',
    title: 'Okaz Cinemas, Kaithachira',
    summary:
      'Centralized cooling, ducting and mechanical ventilation execution for the Okaz Cinemas entertainment complex in Kaithachira, Mannarkkad.',
    buildingType: 'Cinema & multiplex',
    location: 'Kaithachira, Mannarkkad, Kerala',
    system: 'Centralized air conditioning & ventilation',
    capacity: 'Auditorium and lobby cooling system',
    servicesProvided: [
      'Central plant coordination',
      'High-volume ducting fabrication',
      'Acoustic sound attenuation',
      'Testing and commissioning',
    ],
    serviceSlugs: ['hvac-ducting', 'chilled-water-systems'],
    challenge:
      'Managing high occupant heat loads during peak showtimes while delivering adequate fresh air ventilation and addressing distinct cooling needs between the open entrance lobby and the main auditorium.',
    solution:
      'Engineered a dual-zone air distribution layout separating the high-traffic lobby from the screening auditorium, complete with acoustic treatment and dedicated fresh air intake.',
    execution:
      'Positioned high-efficiency cooling equipment on structural plant platforms, installed insulated ductwork with acoustic dampers, and balanced air registers across audience levels.',
    outcome:
      'Rapid cooldown response between back-to-back screenings, quiet operation during screenings, and reliable humidity management across all seasons.',
    images: [
      {
        url: '/images/projects/okaz-cinemas-kaithachira.webp',
        alt: 'Exterior facade of Okaz Cinemas in Kaithachira with central HVAC cooling installation',
        kind: 'cover',
        width: 1354,
        height: 1020,
      },
    ],
    completedAt: '2025-05-10',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectImage(p: Project, kind: ProjectImageKind): ProjectImage | null {
  return p.images.find((i) => i.kind === kind) ?? null;
}

/** Cover photo: an explicit cover, else the "after" photo, else the first image. */
export function projectCover(p: Project): ProjectImage | null {
  return projectImage(p, 'cover') ?? projectImage(p, 'after') ?? p.images[0] ?? null;
}
