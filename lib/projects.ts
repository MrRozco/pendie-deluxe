export const categories = ["All", "Living", "Kitchen & Bath", "Private Rooms"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  location: string;
  summary: string;
  scope: string[];
  before: ProjectImage;
  after: ProjectImage;
}

/**
 * Portfolio content. Images in /public/images are illustrated stand-ins:
 * replace with professional photography shot from matching angles (16:9 works best).
 * When the list grows, move this into a CMS (Sanity, Payload) and keep this shape.
 */
export const projects: Project[] = [
  {
    id: "penthouse-salon",
    title: "Penthouse Salon",
    category: "Living",
    location: "[City]",
    summary:
      "A flat, cluttered living room reimagined as an evening salon: fluted walls, a dusk-lit arched window, a low bouclé sofa and a brass halo that glows like a held breath.",
    scope: ["Full-service design", "Lighting design", "Art curation"],
    before: { src: "/images/salon-before.jpg", alt: "The salon before: flat light, dated furniture and clutter" },
    after: { src: "/images/salon-after.jpg", alt: "The salon after: fluted walls, an arched window at dusk and a brass halo pendant" },
  },
  {
    id: "noir-kitchen",
    title: "The Noir Kitchen",
    category: "Kitchen & Bath",
    location: "[City]",
    summary:
      "Honey oak and laminate gave way to full-height ebonised joinery, a book-matched marble slab and a fluted island crowned with a waterfall top.",
    scope: ["Architectural renovation", "Bespoke joinery", "Stone selection"],
    before: { src: "/images/kitchen-before.jpg", alt: "The kitchen before: oak cabinets and beige tile" },
    after: { src: "/images/kitchen-after.jpg", alt: "The kitchen after: ebonised cabinetry, marble slab and glass pendants" },
  },
  {
    id: "primary-suite",
    title: "The Primary Suite",
    category: "Private Rooms",
    location: "[City]",
    summary:
      "An empty bedroom wrapped in upholstered panelling, softened by floor-to-ceiling sheers and lit by a pair of hand-finished brass sconces.",
    scope: ["Room design", "Upholstered walls", "Bespoke bed"],
    before: { src: "/images/suite-before.jpg", alt: "The bedroom before: a bare bed and boxes" },
    after: { src: "/images/suite-after.jpg", alt: "The suite after: upholstered wall panels, ivory linens and brass sconces" },
  },
  {
    id: "the-library",
    title: "The Library",
    category: "Private Rooms",
    location: "[City]",
    summary:
      "A storage room turned walnut library with backlit niches, a leather reading chair and a desk positioned to catch the last of the light.",
    scope: ["Space planning", "Walnut millwork", "Lighting design"],
    before: { src: "/images/study-before.jpg", alt: "The office before: closed blinds and stacked boxes" },
    after: { src: "/images/study-after.jpg", alt: "The library after: backlit walnut shelving and a leather chair" },
  },
  {
    id: "dining-room",
    title: "The Dining Room",
    category: "Living",
    location: "[City]",
    summary:
      "A dated dining room recast for long dinners: a linear brass chandelier, sculptural chairs, lit niches and a single commanding artwork.",
    scope: ["Full-service design", "Furniture sourcing", "Art curation"],
    before: { src: "/images/dining-before.jpg", alt: "The dining room before: striped wallpaper and a dated chandelier" },
    after: { src: "/images/dining-after.jpg", alt: "The dining room after: a linear brass chandelier and candlelit table" },
  },
  {
    id: "marble-bath",
    title: "The Marble Bath",
    category: "Kitchen & Bath",
    location: "[City]",
    summary:
      "Pink tile replaced by Nero Marquina slabs, a freestanding stone tub, a backlit oval mirror and warm brass throughout.",
    scope: ["Renovation", "Stone selection", "Custom vanity"],
    before: { src: "/images/bath-before.jpg", alt: "The bathroom before: pink tile and a basic tub" },
    after: { src: "/images/bath-after.jpg", alt: "The bath after: dark marble, a freestanding tub and a backlit mirror" },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
export const pad = (n: number) => String(n).padStart(2, "0");
