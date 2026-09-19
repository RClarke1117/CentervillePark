export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "Event" | "News" | "Nature" | "Notice";
  image: string;
};

export const news: NewsItem[] = [
  {
    slug: "legacy-landscapes-breakfast",
    title: "Legacy and Landscapes: Business and Civic Leader Breakfast",
    date: "2026-09-15",
    excerpt:
      "Featuring keynote speaker Dr. David L. Goldstein — an morning for civic partners invested in open space and community health.",
    category: "Event",
    image: "/images/park-meadow.jpg",
  },
  {
    slug: "glowtastic-fun-run",
    title: "GLOW-tastic! Fun Run / Walk",
    date: "2026-10-09",
    excerpt:
      "A glow-in-the-dark fun run and walk at Schoolhouse Park. Kickoff Friday, October 9 — bring lights and good energy.",
    category: "Event",
    image: "/images/park-community.jpg",
  },
  {
    slug: "adapted-action-day",
    title: "Adapted Action Day",
    date: "2026-10-03",
    excerpt:
      "Join us at Activity Center Park on Saturday, October 3 from 10:00 a.m. – 1:00 p.m. for accessible, exciting play.",
    category: "Event",
    image: "/images/playground.jpg",
  },
  {
    slug: "eastern-hornet-fly",
    title: "Eastern Hornet Fly: A Master Mimic",
    date: "2026-09-01",
    excerpt:
      "Within Syrphidae — the hover flies — adults feed on nectar and pollen while wearing a convincing wasp costume.",
    category: "Nature",
    image: "/images/fog-trees.jpg",
  },
  {
    slug: "website-rfp-notice",
    title: "Public Notice: Website Redesign RFP",
    date: "2026-09-01",
    excerpt:
      "CWPD is seeking proposals for a mobile-first redesign of cwpd.org. Proposals due October 12, 2026.",
    category: "Notice",
    image: "/images/nature-hills.jpg",
  },
];

export type Program = {
  id: string;
  title: string;
  audience: "Adult" | "Family" | "Children" | "Preschool" | "All ages";
  dateLabel: string;
  location: string;
  status: "Open" | "Filling" | "Waitlist";
};

export const programs: Program[] = [
  {
    id: "1",
    title: "Moms Who Walk",
    audience: "Adult",
    dateLabel: "Wednesdays · ongoing",
    location: "Rotating parks",
    status: "Open",
  },
  {
    id: "2",
    title: "Movie Party in the Park",
    audience: "Family",
    dateLabel: "Select Fridays · fall series",
    location: "Schoolhouse & Grant",
    status: "Filling",
  },
  {
    id: "3",
    title: "Luminary Walk",
    audience: "All ages",
    dateLabel: "December evenings",
    location: "Bill Yeck Park",
    status: "Open",
  },
  {
    id: "4",
    title: "Summer Day Camp — Nature Explorers",
    audience: "Children",
    dateLabel: "June–August sessions",
    location: "Activity Center",
    status: "Waitlist",
  },
  {
    id: "5",
    title: "Preschool in the Parks",
    audience: "Preschool",
    dateLabel: "Tuesday mornings",
    location: "Oak Grove",
    status: "Open",
  },
  {
    id: "6",
    title: "Adapted Action Day",
    audience: "All ages",
    dateLabel: "October 3, 10 a.m.–1 p.m.",
    location: "Activity Center",
    status: "Open",
  },
];

export type FieldStatus = {
  name: string;
  park: string;
  status: "Open" | "Closed" | "Limited";
  note?: string;
  updated: string;
};

export const fieldStatuses: FieldStatus[] = [
  {
    name: "Soccer Stadium",
    park: "Oak Grove",
    status: "Open",
    updated: "Today · 6:15 a.m.",
  },
  {
    name: "Baseball Diamonds 1–5",
    park: "Oak Grove",
    status: "Open",
    updated: "Today · 6:15 a.m.",
  },
  {
    name: "Football Fields",
    park: "Schoolhouse",
    status: "Limited",
    note: "East field soft after overnight rain",
    updated: "Today · 6:15 a.m.",
  },
  {
    name: "Soccer Fields A–C",
    park: "Forest Field",
    status: "Closed",
    note: "Standing water — recheck after noon",
    updated: "Today · 6:15 a.m.",
  },
  {
    name: "Diamonds 1–2",
    park: "Iron Horse",
    status: "Open",
    updated: "Today · 6:15 a.m.",
  },
  {
    name: "Multi-use fields",
    park: "Robert F. Mays",
    status: "Open",
    updated: "Today · 6:15 a.m.",
  },
];
