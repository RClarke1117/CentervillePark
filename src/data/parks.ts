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
  | "basketball"
  | "sled-hill"
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
  basketball: "Basketball",
  "sled-hill": "Sled hill",
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
  /** Exact RecDesk Location Filter label(s) for programs at this park */
  recdeskLocations?: string[];
  /** RecDesk Facility checkbox ids used to auto-filter programs */
  recdeskFacilityIds?: number[];
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
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "pickleball",
      "picnic",
    ],
    summary:
      "Home to the Park District office, an all-access playground, zero-depth sprayground, and shelters where kids of all abilities play side by side.",
    image: "/images/parks/activity-center.jpg",
    featured: true,
    recdeskLocations: ["Activity Center Park"],
    recdeskFacilityIds: [15],
  },
  {
    slug: "oak-grove",
    name: "Oak Grove",
    type: "community",
    acres: 102.058,
    address: "1790 E. Social Row Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "dog-park",
      "archery",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "fishing",
      "sports-fields",
      "tennis",
      "picnic",
    ],
    summary:
      "A stand of old oaks anchors soccer fields, baseball diamonds, tennis courts, an archery range, and the community dog park.",
    image: "/images/parks/oak-grove.jpg",
    featured: true,
    recdeskLocations: ["Oak Grove Park"],
    recdeskFacilityIds: [3],
  },
  {
    slug: "grant",
    name: "Grant",
    type: "nature",
    acres: 222.48,
    address: "501 Normandy Ridge Road",
    city: "Washington Township",
    amenities: [
      "playground",
      "hiking-trails",
      "paved-trails",
      "restrooms",
      "sled-hill",
      "picnic",
    ],
    summary:
      "A 222-acre natural area with trails through forest, meadow, prairie, and wetland — one of the largest open spaces in the district.",
    image: "/images/parks/grant.jpg",
    featured: true,
    recdeskLocations: [
      "Grant Park - Normandy Entrance",
      "Grant Park - McEwen Entrance (All Amenities)",
      "Grant Park - Nature Nook",
    ],
    recdeskFacilityIds: [21, 24, 25],
  },
  {
    slug: "bill-yeck",
    name: "Bill Yeck",
    type: "nature",
    acres: 194.352,
    address: "Rooks Mill Ln. · Centerville Station Rd. · Wilmington-Dayton Rd.",
    city: "Washington Township",
    amenities: [
      "hiking-trails",
      "shelter-drop-in",
      "restrooms",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Nearly 200 acres along 1.75 miles of Sugar Creek — trails, rare plants, and year-round nature programs.",
    image: "/images/parks/bill-yeck.jpg",
    featured: true,
    recdeskLocations: [
      "Bill Yeck Park - Smith House Entrance",
      "Bill Yeck Park - McGuffey Meadow Entrance",
      "Bill Yeck Park - Rooks Mill Lane Entrance",
    ],
    recdeskFacilityIds: [26, 158, 143],
  },
  {
    slug: "schoolhouse",
    name: "Schoolhouse",
    type: "community",
    acres: 35.535,
    address: "1875 Nutt Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "tennis",
      "pickleball",
      "basketball",
      "picnic",
    ],
    summary:
      "Home to youth football and community gatherings, with playgrounds, shelters, and open fields for game days and movie nights.",
    image: "/images/parks/schoolhouse.jpg",
    featured: true,
    recdeskLocations: ["Schoolhouse Park"],
    recdeskFacilityIds: [1],
  },
  {
    slug: "iron-horse",
    name: "Iron Horse",
    type: "community",
    acres: 31.833,
    address: "6161 Millshire Dr.",
    city: "Centerville",
    amenities: [
      "playground",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Named for the historic rail corridor, with a paved multi-use trail, playground, diamonds, and neighborhood gathering spaces.",
    image: "/images/parks/iron-horse.jpg",
    recdeskLocations: ["Iron Horse Park"],
    recdeskFacilityIds: [13],
  },
  {
    slug: "forest-field",
    name: "Forest Field",
    type: "community",
    acres: 44.274,
    address: "2100 E. Centerville Station Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "accessible-playground",
      "hiking-trails",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "tennis",
      "pickleball",
      "picnic",
    ],
    summary:
      "An arboretum-meets-community park with paved loops into Bill Yeck, tennis and pickleball, and a natural play area.",
    image: "/images/parks/forest-field.jpg",
    recdeskLocations: ["Forest Field Park"],
    recdeskFacilityIds: [11],
  },
  {
    slug: "oak-creek-south",
    name: "Oak Creek South",
    type: "community",
    acres: 24.16,
    address: "790 Miamisburg-Centerville Rd.",
    city: "Centerville",
    amenities: [
      "playground",
      "skatepark",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "picnic",
    ],
    summary:
      "Skatepark, play equipment, a renovated wetland stream corridor, and a group shelter with restrooms.",
    image: "/images/parks/oak-creek-south.jpg",
    recdeskLocations: ["Oak Creek South Park"],
    recdeskFacilityIds: [17],
  },
  {
    slug: "robert-f-mays",
    name: "Robert F. Mays",
    type: "community",
    acres: 23.204,
    address: "10553 Paragon Rd.",
    city: "Washington Township",
    amenities: [
      "playground",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "picnic",
    ],
    summary:
      "Community fields and a reservable shelter supporting youth sports and neighborhood gatherings.",
    image: "/images/parks/robert-f-mays.jpg",
    recdeskLocations: ["Robert F. Mays Park"],
    recdeskFacilityIds: [19],
  },
  {
    slug: "yankee",
    name: "Yankee",
    type: "community",
    acres: 36.679,
    address: "7500 Yankee St.",
    city: "Centerville",
    amenities: [
      "playground",
      "hiking-trails",
      "paved-trails",
      "shelter-reservable",
      "restrooms",
      "sports-fields",
      "tennis",
      "pickleball",
      "picnic",
    ],
    summary:
      "Tennis, pickleball, playground, and diamonds on 37 acres — a full community park along Yankee Street.",
    image: "/images/parks/yankee.jpg",
    recdeskLocations: ["Yankee Park"],
    recdeskFacilityIds: [2],
  },
  {
    slug: "black-oak",
    name: "Black Oak",
    type: "nature",
    acres: 17.855,
    address: "1552 Ambridge Road / 7766 Bigger Road",
    city: "Washington Township",
    amenities: [
      "playground",
      "hiking-trails",
      "paved-trails",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Hiking trails, a short paved path, wetland overlook, and play equipment in a quiet nature park.",
    image: "/images/parks/black-oak.jpg",
  },
  {
    slug: "black-oak-east",
    name: "Black Oak East",
    type: "nature",
    acres: 25.394,
    address: "7835 John Elwood Drive",
    city: "Washington Township",
    amenities: ["picnic"],
    summary:
      "A companion nature preserve to Black Oak with soft-surface trails and woodland habitat.",
    image: "/images/parks/black-oak-east.png",
  },
  {
    slug: "holes-creek",
    name: "Holes Creek",
    type: "nature",
    acres: 25.197,
    address: "8575 Yankee Street",
    city: "Centerville",
    amenities: ["paved-trails", "shelter-drop-in"],
    summary:
      "A 10-foot-wide paved multi-use trail spanning 1.3 miles along the Holes Creek corridor.",
    image: "/images/parks/holes-creek.jpg",
    recdeskLocations: ["Holes Creek Park"],
    recdeskFacilityIds: [59],
  },
  {
    slug: "huffman",
    name: "Huffman",
    type: "nature",
    acres: 12.448,
    address: "1616 W. Alex-Bell Road",
    city: "Washington Township",
    amenities: [],
    summary:
      "A natural area with a meandering stream held as wildlife habitat — limited access, no off-street parking or trails.",
    image: "/images/parks/huffman.jpg",
  },
  {
    slug: "woodbourne-springs",
    name: "Woodbourne Springs",
    type: "nature",
    acres: 7.081,
    address: "220 W. Whipp Road",
    city: "Washington Township",
    amenities: ["hiking-trails", "picnic"],
    summary:
      "A nature park beside Dr. John Hole Elementary with hiking trails and a stream corridor.",
    image: "/images/parks/woodbourne-springs.jpg",
  },
  {
    slug: "forest-walk",
    name: "Forest Walk",
    type: "nature",
    acres: 8.278,
    address: "7570 Forest Brook Boulevard",
    city: "Centerville",
    amenities: ["playground", "hiking-trails", "picnic"],
    summary:
      "Wooded trails and play equipment, accessible from Forest Brook Boulevard and Deer Run Road.",
    image: "/images/parks/forest-walk.jpg",
    recdeskLocations: ["Forest Walk Park"],
    recdeskFacilityIds: [56],
  },
  {
    slug: "nutt-woods",
    name: "Nutt Woods",
    type: "neighborhood",
    acres: 3.075,
    address: "10188 Ashpark Court",
    city: "Centerville",
    amenities: ["hiking-trails", "picnic"],
    summary:
      "A small wooded park known for spring wildflowers, including the district’s only patch of goldenseal.",
    image: "/images/parks/nutt-woods.jpg",
  },
  {
    slug: "rooks-ravine",
    name: "Rooks Ravine",
    type: "nature",
    acres: 5.16,
    address: "9100 Rooks Road",
    city: "Washington Township",
    amenities: [],
    summary:
      "A steep, wooded ravine preserve protecting habitat and quiet trail moments.",
    image: "/images/parks/rooks-ravine.jpg",
  },
  {
    slug: "little-woods",
    name: "Little Woods",
    type: "nature",
    acres: 3.6,
    address: "Little Woods Park",
    city: "Centerville",
    amenities: ["hiking-trails"],
    summary:
      "Developed with an emphasis on native plants — a pocket woodland for close-to-home nature.",
    image: "/images/parks/little-woods.jpg",
  },
  {
    slug: "cloverbrook",
    name: "Cloverbrook",
    type: "neighborhood",
    acres: 5.522,
    address: "7566 Cloverbrook Park Drive",
    city: "Centerville",
    amenities: ["playground", "picnic"],
    summary:
      "Neighborhood play and picnic space within walking distance of nearby homes.",
    image: "/images/parks/cloverbrook.jpg",
  },
  {
    slug: "donnybrook",
    name: "Donnybrook",
    type: "neighborhood",
    acres: 4.724,
    address: "6161 Donnybrook Drive",
    city: "Centerville",
    amenities: ["playground", "hiking-trails", "picnic"],
    summary:
      "Reachable from Donnybrook Drive or Millbrook — play equipment and green space for the block.",
    image: "/images/parks/donnybrook.jpg",
  },
  {
    slug: "green",
    name: "Green",
    type: "neighborhood",
    acres: 5,
    address: "6661 Green Park Drive",
    city: "Centerville",
    amenities: [
      "playground",
      "shelter-drop-in",
      "sports-fields",
      "tennis",
    ],
    summary:
      "A five-acre neighborhood park with play and gathering space.",
    image: "/images/parks/green.jpg",
  },
  {
    slug: "pleasant-hill",
    name: "Pleasant Hill",
    type: "neighborhood",
    acres: 37,
    address: "358 Zengel Drive",
    city: "Centerville",
    amenities: ["playground", "hiking-trails", "picnic"],
    summary:
      "Neighborhood park purchased with community assistance — play, picnic, and light trails.",
    image: "/images/parks/pleasant-hill.png",
  },
  {
    slug: "quail-run",
    name: "Quail Run",
    type: "neighborhood",
    acres: 9.16,
    address: "1180 Timberhawk Trail",
    city: "Centerville",
    amenities: [
      "playground",
      "hiking-trails",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Nearly ten acres of neighborhood open space with play and walking paths.",
    image: "/images/parks/quail-run.jpg",
  },
  {
    slug: "beechwood-springs",
    name: "Beechwood Springs",
    type: "neighborhood",
    acres: 11.455,
    address: "1141 Quiet Brook Trail",
    city: "Centerville",
    amenities: ["playground", "hiking-trails", "picnic"],
    summary:
      "Wooded neighborhood park with play areas and soft paths among the beeches.",
    image: "/images/parks/beechwood-springs.jpg",
  },
  {
    slug: "big-bend",
    name: "Big Bend",
    type: "neighborhood",
    acres: 7.841,
    address: "1328 Spring Ash Drive",
    city: "Washington Township",
    amenities: ["playground", "hiking-trails", "picnic"],
    summary:
      "Big Bend Park is a neighborhood park with some features of a nature park. A tributary of Holes Creek runs along the southern edge of the playground.",
    image: "/images/parks/big-bend.png",
    recdeskLocations: ["Big Bend Park"],
    recdeskFacilityIds: [42],
  },
  {
    slug: "brittany-hills",
    name: "Brittany Hills",
    type: "neighborhood",
    acres: 4.184,
    address: "5825 Batsford Drive",
    city: "Centerville",
    amenities: ["playground", "hiking-trails", "picnic"],
    summary:
      "Brittany Hills Park is a neighborhood park with a wooded area and play equipment featuring slides, climbers, belt swings and infant swings.",
    image: "/images/parks/brittany-hills.jpg",
  },
  {
    slug: "cherry-hill",
    name: "Cherry Hill",
    type: "neighborhood",
    acres: 6.016,
    address: "10244 Cherry Tree Terrace",
    city: "Centerville",
    amenities: ["playground", "sled-hill", "picnic"],
    summary:
      "Cherry Hill Park features play equipment including a slide, tire swing, belt swings, infant swings, and talk tubes. An open area is available for athletics.",
    image: "/images/parks/cherry-hill.jpg",
  },
  {
    slug: "concept",
    name: "Concept",
    type: "neighborhood",
    acres: 6.016,
    address: "345 Clareridge Lane",
    city: "Centerville",
    amenities: [
      "playground",
      "shelter-drop-in",
      "basketball",
      "picnic",
    ],
    summary:
      "Concept Park is a neighborhood park featuring a basketball court, small shelter, and play equipment including a climber with slides, belt swings and infant swings.",
    image: "/images/parks/concept.png",
  },
  {
    slug: "divided-ridge",
    name: "Divided Ridge",
    type: "neighborhood",
    acres: 1.374,
    address: "347 Beck Drive",
    city: "Centerville",
    amenities: ["playground", "paved-trails", "shelter-drop-in"],
    summary:
      "Divided Ridge Park is a neighborhood park located in Benham Estates. It features a paved walking path, benches, play equipment and a neighborhood shelter.",
    image: "/images/parks/divided-ridge.png",
  },
  {
    slug: "elizabeth-hoy",
    name: "Elizabeth Hoy",
    type: "neighborhood",
    acres: 4.058,
    address: "185 Hampton Drive",
    city: "Centerville",
    amenities: ["playground", "paved-trails"],
    summary:
      "Elizabeth Hoy Park is an open green space with a small concrete whale climber. It is adjacent to the Activity Center Park .",
    image: "/images/parks/elizabeth-hoy.png",
  },
  {
    slug: "fence-row",
    name: "Fence Row",
    type: "neighborhood",
    acres: 2.0169,
    address: "1650 Haley Drive",
    city: "Centerville",
    amenities: ["playground", "picnic"],
    summary:
      "Fence Row Park features play equipment with a Thunderhead climber, belt swings, infant swings and an adult swing.",
    image: "/images/parks/fence-row.jpg",
  },
  {
    slug: "greene-line",
    name: "Greene Line",
    type: "neighborhood",
    acres: 11.325,
    address: "6774 Crossbrook Drive 2170 Briggs Drive",
    city: "Centerville",
    amenities: [
      "playground",
      "hiking-trails",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Greene Line Park is a large neighborhood park with a wooded area with hiking trails in the eastern section. Play equipment with climbers, belt swings and infant swings located near the Crossbrook Drive entrance.",
    image: "/images/parks/greene-line.jpg",
  },
  {
    slug: "hithergreen",
    name: "Hithergreen",
    type: "neighborhood",
    acres: 14.889,
    address: "5900 Hithergreen Drive",
    city: "Washington Township",
    amenities: [
      "playground",
      "hiking-trails",
      "paved-trails",
      "shelter-drop-in",
      "picnic",
    ],
    summary:
      "Site of the former Hithergreen Center, the Park District acquired this park from Washington Township in April 2019. The building on the property was demolished in fall 2019.",
    image: "/images/parks/hithergreen.png",
  },
  {
    slug: "little-mound",
    name: "Little Mound",
    type: "neighborhood",
    acres: 5.141,
    address: "9490 Still Meadow Lane",
    city: "Centerville",
    amenities: ["playground", "sled-hill", "picnic"],
    summary:
      "Little Mound Park is a neighborhood park with a sled hill and play equipment including a climber, slide, zip line, swings and infant swings.",
    image: "/images/parks/little-mound.jpg",
  },
  {
    slug: "manor",
    name: "Manor",
    type: "neighborhood",
    acres: 7.431,
    address: "989 Thorndale Drive",
    city: "Centerville",
    amenities: ["playground", "picnic"],
    summary:
      "Manor Park is a neighborhood park with play equipment including a climber, slides, belt swings and infant swings.",
    image: "/images/parks/manor.jpg",
  },
  {
    slug: "old-lane",
    name: "Old Lane",
    type: "neighborhood",
    acres: 4.426,
    address: "500 Druewood Lane",
    city: "Centerville",
    amenities: [
      "playground",
      "tennis",
      "pickleball",
      "picnic",
    ],
    summary:
      "Old Lane Park is a neighborhood park with tennis courts and play equipment featuring climbers, slides, belt swings and infant swings.",
    image: "/images/parks/old-lane.jpg",
  },
  {
    slug: "rahn",
    name: "Rahn",
    type: "neighborhood",
    acres: 0.98,
    address: "223 W. Rahn Road",
    city: "Centerville",
    amenities: ["playground", "picnic"],
    summary:
      "Rahn Park is a neighborhood park with play equipment featuring climbers, slides, belt swings and infant swings.",
    image: "/images/parks/rahn.jpg",
  },
  {
    slug: "red-coach",
    name: "Red Coach",
    type: "neighborhood",
    acres: 5,
    address: "5500 Royalwood Drive",
    city: "Centerville",
    amenities: ["playground", "shelter-drop-in", "picnic"],
    summary:
      "Red Coach Park is a neighborhood park with play equipment featuring climbers, slides, belt swings and infant swings. A small picnic shelter is available for use.",
    image: "/images/parks/red-coach.jpg",
  },
  {
    slug: "rosewood",
    name: "Rosewood",
    type: "neighborhood",
    acres: 13.047,
    address: "475 Roselake Drive",
    city: "Centerville",
    amenities: [
      "playground",
      "hiking-trails",
      "fishing",
      "sports-fields",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Rosewood Park is a neighborhood park located in Rose Estates. The park includes a large open area for sports, a fishing pond, sled hill and woods to explore.",
    image: "/images/parks/rosewood.png",
  },
  {
    slug: "silvercreek",
    name: "Silvercreek",
    type: "neighborhood",
    acres: 8.969,
    address: "9369 Yankee Street",
    city: "Centerville",
    amenities: ["paved-trails"],
    summary:
      "The Centerville-Washington Park District installed a multi-use trail through Holes Creek and Silvercreek Parks. This project was funded in part through a Clean Ohio Trails grant and spans 3,900 feet from the north end of Holes Creek to Spring Valley Pike, and approximately 2,100 ",
    image: "/images/parks/silvercreek.jpg",
  },
  {
    slug: "stansel",
    name: "Stansel",
    type: "neighborhood",
    acres: 3.546,
    address: "1304 Sarah Freeman Drive",
    city: "Washington Township",
    amenities: [],
    summary:
      "Stansel Park is a neighborhood park located in Sweeney Place.",
    image: "/images/parks/stansel.jpg",
  },
  {
    slug: "stringtown",
    name: "Stringtown",
    type: "neighborhood",
    acres: 4.168,
    address: "9191 Woodstream Lane",
    city: "Centerville",
    amenities: ["playground", "sled-hill", "picnic"],
    summary:
      "Stringtown Park is a neighborhood park with a sled hill and play equipment.",
    image: "/images/parks/stringtown.jpg",
    recdeskLocations: ["Stringtown Park"],
    recdeskFacilityIds: [146],
  },
  {
    slug: "trailways",
    name: "Trailways",
    type: "neighborhood",
    acres: 1,
    address: "1165 W. Spring Valley Pike",
    city: "Washington Township",
    amenities: ["paved-trails", "picnic"],
    summary:
      "The park provides a resting spot for bicyclists traveling the multi-use trail on the shared sidewalk along Spring Valley Pike. It is located in the McEwen Woods neighborhood, just west of McEwen Road.",
    image: "/images/parks/trailways.jpg",
  },
  {
    slug: "village-south",
    name: "Village South",
    type: "neighborhood",
    acres: 17.188,
    address: "411 North Village Drive",
    city: "Centerville",
    amenities: [
      "playground",
      "shelter-drop-in",
      "tennis",
      "pickleball",
      "basketball",
      "picnic",
    ],
    summary:
      "Village South Park is a neighborhood park with a basketball court, tennis courts and play equipment featuring climbers, slides, belt swings and infant swings. A small picnic shelter is available.",
    image: "/images/parks/village-south.jpg",
  },
  {
    slug: "wagon-trail",
    name: "Wagon Trail",
    type: "neighborhood",
    acres: 7.014,
    address: "8450 Washington Village Drive",
    city: "Centerville",
    amenities: ["playground", "picnic"],
    summary:
      "Wagon Trail Park is a neighborhood park with large open areas for sports and play equipment including a climber, slides, belt swings and infant swings.",
    image: "/images/parks/wagon-trail.jpg",
  },
  {
    slug: "waterbury-woods",
    name: "Waterbury Woods",
    type: "neighborhood",
    acres: 6.607,
    address: "1250 W. Social Row Road",
    city: "Washington Township",
    amenities: [
      "playground",
      "sports-fields",
      "sled-hill",
      "picnic",
    ],
    summary:
      "Waterbury Woods Park is a neighborhood park with a large open area for sports, sled hill, and play equipment with belt swings and infant swings.",
    image: "/images/parks/waterbury-woods.png",
  },
  {
    slug: "watkins-glen",
    name: "Watkins Glen",
    type: "neighborhood",
    acres: 5.712,
    address: "825 Watkins Glen Drive",
    city: "Washington Township",
    amenities: ["playground", "picnic"],
    summary:
      "Watkins Glen Park is divided by a creek with a large open area to the west and play equipment including a climber, adult swing, belt swings and infant swings to the east. A stone crossing joins the two park areas.",
    image: "/images/parks/watkins-glen.jpg",
  },
  {
    slug: "weatherstone",
    name: "Weatherstone",
    type: "neighborhood",
    acres: 5.099,
    address: "10998 Pennfield Road 164 Summerford Place",
    city: "Centerville",
    amenities: ["playground", "picnic"],
    summary:
      "Weatherstone Park offers play equipment with a climber, slides, swings, baby swings and a tire swing. The playground was installed with support from an Ohio NatureWorks grant.",
    image: "/images/parks/weatherstone.png",
  },
  {
    slug: "willowbrook",
    name: "Willowbrook",
    type: "neighborhood",
    acres: 17.89,
    address: "10225 Park Edge Drive 570 Nutt Road 10140 Atchison Road",
    city: "Centerville",
    amenities: [
      "playground",
      "hiking-trails",
      "shelter-drop-in",
      "basketball",
      "picnic",
    ],
    summary:
      "Willowbrook Park surrounds a creek from Nutt Road south to a large open area along Park Edge Drive. Hiking trails through the woods and across the creek provide opportunities for nature exploration.",
    image: "/images/parks/willowbrook.jpg",
  },
  {
    slug: "woodbourne-green",
    name: "Woodbourne Green",
    type: "neighborhood",
    acres: 0.113,
    address: "W. Whipp Road at Paddington Road",
    city: "Centerville",
    amenities: [],
    summary:
      "Woodbourne Green Park is a triangular shaped parcel located where Whipp Road meets Paddington Road. The park features a rock with a historical marker placed by the Centerville Historical Society in 1971.",
    image: "/images/parks/woodbourne-green.jpg",
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
