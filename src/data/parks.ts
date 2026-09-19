export type ParkType = "community" | "nature" | "neighborhood";

export type Amenity =
  | "playground"
  | "accessible-playground"
  | "sprayground"
  | "skatepark"
  | "dog-park"
  | "archery"
  | "hiking-trails"
  | "paved-trails"
  | "shelter-reservable"
  | "shelter-drop-in"
  | "restrooms"
  | "fishing"
  | "sports-fields"
  | "tennis"
  | "pickleball"
  | "picnic";

export const AMENITY_LABELS: Record<Amenity, string> = {
  playground: "Playground",
  "accessible-playground": "All-access playground",
  sprayground: "Sprayground",
  skatepark: "Skatepark",
  "dog-park": "Off-leash dog park",
  archery: "Archery range",
  "hiking-trails": "Hiking trails",
  "paved-trails": "Paved trails",
  "shelter-reservable": "Reservable shelter",
  "shelter-drop-in": "Drop-in shelter",
  restrooms: "Restrooms",
  fishing: "Fishing",
  "sports-fields": "Sports fields",
  tennis: "Tennis",
  pickleball: "Pickleball",
  picnic: "Picnic areas",
};

export type Park = {
  slug: string;
  name: string;
  type: ParkType;
  acres: number | null;
  address: string;
  city: string;
  amenities: Amenity[];
  summary: string;
  image: string;
  featured?: boolean;
};

export const parks: Park[] = [
  {
    slug: "activity-center",
    name: "Activity Center",
    type: "community",
    acres: 22.1,
    address: "221 N. Main St.",
    city: "Centerville",
    amenities: [
      "accessible-playground",
      "sprayground",
      "shelter-reservable",
      "restrooms",
      "picnic",
      "sports-fields",
    ],
    summary:
      "Home to the Park District office, an all-access playground, zero-depth sprayground, and shelters where kids of all abilities play side by side.",
    image: "/images/playground.jpg",
    featured: true,
  },
  {
    slug: "oak-grove",
    name: "Oak Grove",
    type: "community",
    acres: 102.1,
    address: "1790 E. Social Row Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "dog-park",
      "archery",
      "sports-fields",
      "tennis",
      "shelter-reservable",
      "restrooms",
      "picnic",
      "hiking-trails",
    ],
    summary:
      "A stand of old oaks anchors soccer fields, baseball diamonds, tennis courts, an archery range, and the community dog park.",
    image: "/images/park-community.jpg",
    featured: true,
  },
  {
    slug: "grant",
    name: "Grant",
    type: "nature",
    acres: 222.5,
    address: "Grant Park Trailhead",
    city: "Washington Township",
    amenities: ["hiking-trails", "paved-trails", "picnic", "fishing"],
    summary:
      "A 222-acre natural area with trails through forest, meadow, and stream corridors — one of the largest open spaces in the district.",
    image: "/images/fog-trees.jpg",
    featured: true,
  },
  {
    slug: "bill-yeck",
    name: "Bill Yeck",
    type: "nature",
    acres: 194.4,
    address: "Along Sugarcreek",
    city: "Washington Township",
    amenities: ["hiking-trails", "paved-trails", "picnic"],
    summary:
      "Nearly 200 acres of trails along Sugarcreek with soft-surface hiking, paved loops, and year-round nature immersion.",
    image: "/images/park-trail.jpg",
    featured: true,
  },
  {
    slug: "schoolhouse",
    name: "Schoolhouse",
    type: "community",
    acres: 35.5,
    address: "1875 Nutt Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "sports-fields",
      "shelter-reservable",
      "restrooms",
      "picnic",
      "paved-trails",
    ],
    summary:
      "Home to youth football and community gatherings, with playgrounds, shelters, and open fields for game days and movie nights.",
    image: "/images/park-meadow.jpg",
    featured: true,
  },
  {
    slug: "iron-horse",
    name: "Iron Horse",
    type: "community",
    acres: 31.8,
    address: "6161 Millshire Dr.",
    city: "Centerville",
    amenities: [
      "playground",
      "sports-fields",
      "shelter-reservable",
      "restrooms",
      "paved-trails",
      "picnic",
    ],
    summary:
      "Named for the historic rail corridor, with a paved multi-use trail, playground, diamonds, and neighborhood gathering spaces.",
    image: "/images/hiking.jpg",
  },
  {
    slug: "forest-field",
    name: "Forest Field",
    type: "community",
    acres: 44.3,
    address: "2100 E. Centerville Station Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "accessible-playground",
      "sports-fields",
      "tennis",
      "pickleball",
      "shelter-drop-in",
      "restrooms",
      "paved-trails",
      "hiking-trails",
      "picnic",
    ],
    summary:
      "An arboretum-meets-community park with paved loops into Bill Yeck, tennis and pickleball, and a natural play area.",
    image: "/images/nature-hills.jpg",
  },
  {
    slug: "oak-creek-south",
    name: "Oak Creek South",
    type: "community",
    acres: 24.2,
    address: "790 Miamisburg-Centerville Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "skatepark",
      "shelter-reservable",
      "restrooms",
      "paved-trails",
      "sports-fields",
      "picnic",
    ],
    summary:
      "Skatepark, play equipment, a renovated wetland stream corridor, and a group shelter with restrooms.",
    image: "/images/park-community.jpg",
  },
  {
    slug: "robert-f-mays",
    name: "Robert F. Mays",
    type: "community",
    acres: 23.2,
    address: "10553 Paragon Rd.",
    city: "Washington Township",
    amenities: [
      "playground",
      "sports-fields",
      "shelter-reservable",
      "restrooms",
      "picnic",
    ],
    summary:
      "Community fields and a reservable shelter supporting youth sports and neighborhood gatherings.",
    image: "/images/park-meadow.jpg",
  },
  {
    slug: "yankee",
    name: "Yankee",
    type: "neighborhood",
    acres: 10,
    address: "7500 Yankee St.",
    city: "Centerville",
    amenities: ["playground", "tennis", "pickleball", "picnic", "shelter-drop-in"],
    summary:
      "Tennis, pickleball, and a playground tucked into the neighborhood — an easy walk for an afternoon outside.",
    image: "/images/playground.jpg",
  },
  {
    slug: "black-oak",
    name: "Black Oak",
    type: "nature",
    acres: 17.9,
    address: "Near John Elwood Drive",
    city: "Washington Township",
    amenities: ["hiking-trails", "paved-trails"],
    summary:
      "Quiet hiking and a short paved loop through oak woodland — ideal for a short nature reset.",
    image: "/images/fog-trees.jpg",
  },
  {
    slug: "black-oak-east",
    name: "Black Oak East",
    type: "nature",
    acres: 25.4,
    address: "7835 John Elwood Drive",
    city: "Washington Township",
    amenities: ["hiking-trails"],
    summary:
      "A companion nature preserve to Black Oak with soft-surface trails and woodland habitat.",
    image: "/images/park-trail.jpg",
  },
  {
    slug: "holes-creek",
    name: "Holes Creek",
    type: "nature",
    acres: null,
    address: "8575 Yankee Street",
    city: "Centerville",
    amenities: ["paved-trails"],
    summary:
      "A 10-foot-wide paved multi-use trail spanning 1.3 miles along the Holes Creek corridor.",
    image: "/images/hiking.jpg",
  },
  {
    slug: "huffman",
    name: "Huffman",
    type: "nature",
    acres: 12.4,
    address: "Huffman Park",
    city: "Washington Township",
    amenities: ["hiking-trails"],
    summary:
      "A meandering stream and wooded trails for quiet walks close to home.",
    image: "/images/nature-hills.jpg",
  },
  {
    slug: "woodbourne-springs",
    name: "Woodbourne Springs",
    type: "nature",
    acres: null,
    address: "Woodbourne Springs",
    city: "Washington Township",
    amenities: ["hiking-trails", "picnic"],
    summary:
      "Natural area with trails through springs and woodland — a quieter corner of the district.",
    image: "/images/fog-trees.jpg",
  },
  {
    slug: "forest-walk",
    name: "Forest Walk",
    type: "nature",
    acres: null,
    address: "Forest Walk Park",
    city: "Centerville",
    amenities: ["hiking-trails"],
    summary:
      "Wooded trails and a neighborhood nature escape for everyday walks.",
    image: "/images/park-trail.jpg",
  },
  {
    slug: "nutt-woods",
    name: "Nutt Woods",
    type: "neighborhood",
    acres: 3.1,
    address: "Near Nutt Road",
    city: "Centerville",
    amenities: ["playground", "picnic", "hiking-trails"],
    summary:
      "A compact neighborhood green with play and wooded edges.",
    image: "/images/park-meadow.jpg",
  },
  {
    slug: "rooks-ravine",
    name: "Rooks Ravine",
    type: "nature",
    acres: 5.2,
    address: "Rooks Ravine",
    city: "Washington Township",
    amenities: ["hiking-trails"],
    summary:
      "A steep, wooded ravine preserve protecting habitat and quiet trail moments.",
    image: "/images/nature-hills.jpg",
  },
  {
    slug: "little-woods",
    name: "Little Woods",
    type: "nature",
    acres: 3.6,
    address: "Little Woods Park",
    city: "Centerville",
    amenities: ["hiking-trails", "picnic"],
    summary:
      "Developed with an emphasis on native plants — a pocket woodland for close-to-home nature.",
    image: "/images/fog-trees.jpg",
  },
  {
    slug: "cloverbrook",
    name: "Cloverbrook",
    type: "neighborhood",
    acres: null,
    address: "7566 Cloverbrook Park Drive",
    city: "Centerville",
    amenities: ["playground", "picnic", "shelter-drop-in"],
    summary:
      "Neighborhood play and picnic space within walking distance of nearby homes.",
    image: "/images/playground.jpg",
  },
  {
    slug: "donnybrook",
    name: "Donnybrook",
    type: "neighborhood",
    acres: null,
    address: "6161 Donnybrook Drive",
    city: "Centerville",
    amenities: ["playground", "picnic", "paved-trails"],
    summary:
      "Reachable from Donnybrook Drive or Millshire — play equipment and green space for the block.",
    image: "/images/park-community.jpg",
  },
  {
    slug: "green",
    name: "Green",
    type: "neighborhood",
    acres: 5,
    address: "6661 Green Park Drive",
    city: "Centerville",
    amenities: ["playground", "picnic", "shelter-drop-in"],
    summary:
      "A five-acre neighborhood park with play and gathering space.",
    image: "/images/park-meadow.jpg",
  },
  {
    slug: "pleasant-hill",
    name: "Pleasant Hill",
    type: "neighborhood",
    acres: null,
    address: "358 Zengel Drive",
    city: "Centerville",
    amenities: ["playground", "picnic", "hiking-trails"],
    summary:
      "Neighborhood park purchased with community assistance — play, picnic, and light trails.",
    image: "/images/hiking.jpg",
  },
  {
    slug: "quail-run",
    name: "Quail Run",
    type: "neighborhood",
    acres: 9.2,
    address: "Quail Run Park",
    city: "Centerville",
    amenities: ["playground", "picnic", "hiking-trails"],
    summary:
      "Nearly ten acres of neighborhood open space with play and walking paths.",
    image: "/images/park-trail.jpg",
  },
  {
    slug: "beechwood-springs",
    name: "Beechwood Springs",
    type: "neighborhood",
    acres: 11.5,
    address: "Beechwood Springs Park",
    city: "Centerville",
    amenities: ["playground", "picnic", "hiking-trails", "shelter-drop-in"],
    summary:
      "Wooded neighborhood park with play areas and soft paths among the beeches.",
    image: "/images/nature-hills.jpg",
  },
];

export function getPark(slug: string) {
  return parks.find((p) => p.slug === slug);
}

export function filterParks(opts: {
  query?: string;
  type?: ParkType | "all";
  amenities?: Amenity[];
}) {
  const q = opts.query?.trim().toLowerCase() ?? "";
  const type = opts.type ?? "all";
  const amenities = opts.amenities ?? [];

  return parks.filter((p) => {
    if (type !== "all" && p.type !== type) return false;
    if (amenities.length && !amenities.every((a) => p.amenities.includes(a)))
      return false;
    if (!q) return true;
    const hay = `${p.name} ${p.address} ${p.city} ${p.summary} ${p.amenities
      .map((a) => AMENITY_LABELS[a])
      .join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}
