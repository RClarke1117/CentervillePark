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

export type ParkEvent = {
  slug: string;
  title: string;
  /** ISO date YYYY-MM-DD (event start) */
  date: string;
  endDate?: string;
  timeLabel: string;
  location: string;
  excerpt: string;
  body: string;
  image: string;
  /** RecDesk Program Detail id */
  recdeskProgramId: string;
};

/** Special Events from cwpd.recdesk.com (category=11) */
export const events: ParkEvent[] = [
  {
    slug: "halloween-hop-howl-a",
    title: "Halloween Hop & Howl: A",
    date: "2026-10-01",
    timeLabel: "Thursday · 4:00 – 5:30 p.m.",
    location: "Forest Field Park · 2100 E. Centerville Station Rd.",
    excerpt:
      "A festive, family-friendly stroll designed especially for preschoolers with sponsored stations along the way.",
    body: "Join CWPD and local businesses for a festive, family-friendly stroll! Designed especially for preschoolers, this playful walk invites children to stop at sponsored stations along the route.",
    image: "/images/parks/forest-field.jpg",
    recdeskProgramId: "5628",
  },
  {
    slug: "adapted-action-day",
    title: "Adapted Action Day",
    date: "2026-10-03",
    timeLabel: "Saturday · 10:00 a.m. – 1:00 p.m.",
    location: "Activity Center Park · 221 N. Main St.",
    excerpt:
      "An afternoon of adapted events for all abilities — archery, kickball, and more at Activity Center Park.",
    body: "Join us at the accessible and exciting Activity Center Park for an afternoon of adapted events created to serve all abilities — including archery, kickball, and more.",
    image: "/images/parks/activity-center.jpg",
    recdeskProgramId: "5535",
  },
  {
    slug: "halloween-hop-howl-b",
    title: "Halloween Hop & Howl: B",
    date: "2026-10-08",
    timeLabel: "Thursday · 4:00 – 5:30 p.m.",
    location: "Forest Field Park · 2100 E. Centerville Station Rd.",
    excerpt:
      "Second date of the preschool Halloween stroll with local business stations and fall fun.",
    body: "Join CWPD and local businesses for a festive, family-friendly stroll designed especially for preschoolers — a second chance to hop through the stations.",
    image: "/images/playground.jpg",
    recdeskProgramId: "5629",
  },
  {
    slug: "glowtastic-fun-run",
    title: "GLOW-tastic! Fun Run / Walk",
    date: "2026-10-09",
    timeLabel: "Friday · 7:00 – 8:30 p.m.",
    location: "Schoolhouse Park · 1875 Nutt Rd.",
    excerpt:
      "A glow-in-the-dark fun run and walk on a lit half-mile trail at Schoolhouse Park.",
    body: "A special glow-in-the-dark fun run and walk! Kick off on an approximately 0.5-mile paved trail lined with colorful lights and glow-in-the-dark décor.",
    image: "/images/parks/schoolhouse.jpg",
    recdeskProgramId: "5413",
  },
  {
    slug: "truck-or-treat",
    title: "Truck or Treat",
    date: "2026-10-17",
    timeLabel: "Saturday · 10:00 a.m. – noon",
    location: "Oak Grove Park · 1790 E. Social Row Rd.",
    excerpt:
      "Explore community vehicles, collect treats, and climb aboard at this fall family favorite.",
    body: "A fall family favorite! Explore a lineup of awesome trucks and community vehicles while collecting treats and giveaways along the way.",
    image: "/images/parks/oak-grove.jpg",
    recdeskProgramId: "5630",
  },
  {
    slug: "hound-hike",
    title: "Hound Hike",
    date: "2026-10-18",
    timeLabel: "Sunday · 4:00 – 6:00 p.m.",
    location: "Bill Yeck Park, Smith House Entrance · 2230 E. Centerville Station Rd.",
    excerpt:
      "Scent-enrichment fun for dogs and their people at Bill Yeck Park.",
    body: "Did you know just 20 minutes of exploring novel scents has the same enrichment benefits as an hour-long walk for dogs? Let’s get those noses going at Bill Yeck Park.",
    image: "/images/parks/bill-yeck.jpg",
    recdeskProgramId: "5631",
  },
  {
    slug: "honeysuckle-homestead",
    title: "Honeysuckle Homestead",
    date: "2026-11-07",
    timeLabel: "Saturday · 1:00 – 3:00 p.m.",
    location: "Grant Park, Normandy Entrance · 501 Normandy Ridge Rd.",
    excerpt:
      "Family-friendly honeysuckle removal, then a fire and s’mores at Grant Park.",
    body: "Join us for a family-friendly day of honeysuckle removal! After we clear invasive plants, we’ll build a fire and make s’mores.",
    image: "/images/parks/grant.jpg",
    recdeskProgramId: "5636",
  },
  {
    slug: "great-turkey-trek",
    title: "The Great Turkey Trek",
    date: "2026-11-21",
    timeLabel: "Saturday · Noon – 3:00 p.m.",
    location: "Parking at Forest Field Park · 2100 E. Centerville Station Rd.",
    excerpt:
      "A Thanksgiving adventure with clues along the routes — last 5K groups leave at 2:15 p.m.",
    body: "We need your help for this Thanksgiving adventure. Follow the clues along the routes and help us find our way — last groups head onto the 5K trail at 2:15 p.m.",
    image: "/images/hiking.jpg",
    recdeskProgramId: "5415",
  },
];

export const RECDESK_PROGRAMS = "https://cwpd.recdesk.com/Community/Program";

export const RECDESK_SPECIAL_EVENTS =
  "https://cwpd.recdesk.com/Community/Program?category=11";

export function recdeskProgramUrl(programId: string) {
  return `https://cwpd.recdesk.com/Community/Program/Detail?programId=${programId}`;
}

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

/** Upcoming = end date (or start date) is today or later, local calendar day. */
export function getUpcomingEvents(now = new Date()) {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return events
    .filter((e) => {
      const end = new Date(`${e.endDate ?? e.date}T23:59:59`);
      return end >= startOfToday;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

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

