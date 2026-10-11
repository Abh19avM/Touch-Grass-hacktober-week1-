// Curated scenic trail datasets for Pune, Maharashtra (Sahyadri Hills & Western Ghats)
// Features rich local wildlife: Peacocks, Indian Hares, Butterflies, Honeybees, and indigenous flora

export const TRAILS_DATA = [
  {
    id: 'trail-vetal-tekdi',
    name: 'Vetal Tekdi & ARAI Forest Ridge',
    region: 'Kothrud / Senapati Bapat Rd, Pune',
    distanceKm: 5.8,
    elevationGainM: 195,
    difficulty: 'Moderate',
    canopyCoverPct: 78,
    foliageStatus: 'Lush Post-Monsoon Green & Gulmohar',
    foliageIndex: 94,
    foliagePalette: ['#2e7d32', '#d97706', '#dc2626'],
    primarySpecies: ['Gulmohar', 'Banyan Tree', 'Indian Laburnum', 'Neem'],
    wildlifeHighlights: ['Peacocks', 'Indian Hare (Rabbits)', 'Blue Mormon Butterflies', 'Honeybees'],
    surfaceType: 'Red Murrum Soil & Natural Stone Path',
    trafficLevel: 'Low (Morning Runners & Naturalists)',
    bestTimeOfDay: 'Sunrise (05:45 - 08:00)',
    coordinates: [
      [18.5240, 73.8180],
      [18.5265, 73.8195],
      [18.5290, 73.8210],
      [18.5320, 73.8225],
      [18.5345, 73.8205],
      [18.5360, 73.8175],
      [18.5335, 73.8145],
      [18.5300, 73.8130],
      [18.5270, 73.8145],
      [18.5240, 73.8180]
    ],
    description: 'Pune’s highest natural hill crest. Runs under cascading banyan vines, fragrant flowering shrubs, and open grassy plateaus where wild peacocks call at dawn and rabbits dart across the red dirt path.',
    audioCheckpoints: [
      [
        {
          km: 0.2,
          title: 'ARAI Base Trailhead • Screen in Pocket',
          cue: 'Welcome to Vetal Tekdi. Slip your phone into your pocket. Smell the fresh petrichor from the damp red murrum earth. The morning breeze is blowing cool from the hills.',
          sensoryPrompt: 'Listen for the first morning calls of peacocks echoing across the canopy.',
          floraFeature: 'Flowering Bougainvillea & Wild Tulsi'
        },
        {
          km: 1.8,
          title: 'Quarry Lake & Butterfly Glade',
          cue: 'Approaching the old stone quarry lake at km 1.8. Swarms of Common Jezebel and Blue Mormon butterflies are hovering over the water reeds.',
          sensoryPrompt: 'Glance to your left at the wildflower bank; you may spot Indian hares grazing quietly in the tall grass.',
          floraFeature: 'Yellow Copperpod & Wild Grasses'
        },
        {
          km: 3.5,
          title: 'Vetal Peak & Sahyadri Panorama',
          cue: 'You have reached the 800-meter summit ridge. Wide open sky above you. Take a steady breath. On clear mornings, you can see all the way to Sinhagad fort to the south.',
          sensoryPrompt: 'Feel the strong westerly hill wind cooling your arms and chest.',
          floraFeature: 'Old Banyan with Hanging Aerial Vines'
        },
        {
          km: 5.2,
          title: 'Peacock Valley Descent',
          cue: 'Gentle descent through the secluded western wooded slopes. Soft ground underfoot.',
          sensoryPrompt: 'Listen closely for the distinctive rustle of peacocks taking flight between the canopy branches.',
          floraFeature: 'Neem & Subabul Woodland'
        }
      ]
    ][0]
  },
  {
    id: 'trail-taljai-hills',
    name: 'Taljai Hills & Peacock Forest Reserve',
    region: 'Sahakar Nagar / Dhankawadi, Pune',
    distanceKm: 4.6,
    elevationGainM: 110,
    difficulty: 'Easy / Scenic',
    canopyCoverPct: 86,
    foliageStatus: 'Dense Green Canopy & Wild Orchids',
    foliageIndex: 96,
    foliagePalette: ['#1b5e20', '#10b981', '#f59e0b'],
    primarySpecies: ['Banyan Grove', 'Peepal', 'Subabul', 'Flame of the Forest'],
    wildlifeHighlights: ['Resident Dancing Peacocks', 'Black-Naped Hares', 'Honeybee Hives', 'Sunbirds'],
    surfaceType: 'Soft Earthen Forest Trails',
    trafficLevel: 'Peaceful Nature Reserve',
    bestTimeOfDay: 'Early Morning (06:00 - 08:30)',
    coordinates: [
      [18.4780, 73.8460],
      [18.4805, 73.8475],
      [18.4830, 73.8490],
      [18.4855, 73.8510],
      [18.4870, 73.8485],
      [18.4850, 73.8455],
      [18.4820, 73.8440],
      [18.4795, 73.8445],
      [18.4780, 73.8460]
    ],
    description: 'Pune’s famous peacock haven. A zero-vehicle protected forest reserve with lush shaded mud paths winding through banyan groves, where peacocks roam freely beside runners.',
    audioCheckpoints: [
      {
        km: 0.1,
        title: 'Taljai Reserve Entry: Screen Off',
        cue: 'Entering Taljai Peacock Sanctuary. Pocket your phone. The air here is several degrees cooler under the dense forest canopy.',
        sensoryPrompt: 'Breathe in deep: notice the sweet aroma of wild flowering jasmine and damp leaf mulch.',
        floraFeature: 'Massive Banyan canopy with curtain vines'
      },
      {
        km: 1.5,
        title: 'The Great Banyan Cathedral',
        cue: 'You are passing beneath the century-old banyan trees. Hanging aerial roots touch the trail on both sides.',
        sensoryPrompt: 'Listen to the deep hum of wild honeybees in high canopy hives and the melodic call of sunbirds.',
        floraFeature: 'Ficus benghalensis aerial prop roots'
      },
      {
        km: 3.0,
        title: 'Peacock Meadow & Wildflower Clearing',
        cue: 'Km 3.0 opens up into the sunny interior clearing. Peacocks often feed right along the trail edge with their long iridescent tails shimmering in morning light.',
        sensoryPrompt: 'Keep your stride light and quiet to watch them forage without disturbance.',
        floraFeature: 'Wild Blue Karvi & Meadow Grasses'
      },
      {
        km: 4.2,
        title: 'Lotus Pond Glide',
        cue: 'Approaching the natural rainwater pond. Cool mist rises from the lotus leaves.',
        sensoryPrompt: 'Look for green jewel dragonflies hovering over the pink water lilies.',
        floraFeature: 'Sacred Lotus & Reeds'
      }
    ]
  },
  {
    id: 'trail-sinhagad-ascent',
    name: 'Sinhagad Fort Mountain Trail',
    region: 'Donje / Haveli Taluka, Pune',
    distanceKm: 8.2,
    elevationGainM: 520,
    difficulty: 'Challenging / Mountain',
    canopyCoverPct: 65,
    foliageStatus: 'Sahyadri Mist & Wild Mountain Bloom',
    foliageIndex: 91,
    foliagePalette: ['#047857', '#d97706', '#b91c1c'],
    primarySpecies: ['Teakwood (Sagwan)', 'Anjan', 'Wild Fig', 'Karvi Shrubs'],
    wildlifeHighlights: ['Mountain Peacocks', 'Indian Langurs', 'Giant Wood Spiders', 'Sahyadri Butterflies'],
    surfaceType: 'Historic Basalt Stone Steps & Mountain Soil',
    trafficLevel: 'Moderate Morning Trail Runners',
    bestTimeOfDay: 'Early Dawn (05:30 - 08:30)',
    coordinates: [
      [18.3750, 73.7620],
      [18.3730, 73.7600],
      [18.3705, 73.7580],
      [18.3680, 73.7565],
      [18.3664, 73.7557],
      [18.3650, 73.7540],
      [18.3670, 73.7525],
      [18.3700, 73.7550],
      [18.3735, 73.7585],
      [18.3750, 73.7620]
    ],
    description: 'The legendary Sahyadri mountain run rising from the lush Donje base to the windswept Kalyan Darwaza cliff of Sinhagad. Cool cloud mist drifts through ancient teakwood and basalt stone steps.',
    audioCheckpoints: [
      {
        km: 0.2,
        title: 'Donje Foot Trail Start: Focus In',
        cue: 'At the mountain foot. Pocket mode active. The climb begins immediately on red volcanic earth and rustic basalt stones.',
        sensoryPrompt: 'Find a rhythmic breathing rhythm: 2 steps in, 2 steps out.',
        floraFeature: 'Flowering Teak & Mountain Ferns'
      },
      {
        km: 2.8,
        title: 'Mid-Mountain Karvi Thicket',
        cue: 'Halfway up the ridge. Cool morning clouds are rolling over the slopes. The sweet fragrance of blooming Karvi flowers fills the mountain air.',
        sensoryPrompt: 'Listen to the valley wind singing through the rocky ravines.',
        floraFeature: 'Strobilanthes callosa (Karvi)'
      },
      {
        km: 5.5,
        title: 'Kalyan Darwaza Fortress Ridge',
        cue: 'Reaching the historic stone cliff gate. The entire Panshet and Khadakwasla lake valley unfolds 600 meters below.',
        sensoryPrompt: 'Take three massive deep breaths of pure Western Ghats ozone.',
        floraFeature: 'Wild Mountain Fig & Lichen on Basalt'
      },
      {
        km: 7.6,
        title: 'Tanaji Malusare Plateau Loop',
        cue: 'Flat mountain plateau finish line. Mountain swallows swoop around the bastion walls.',
        sensoryPrompt: 'Feel your heart rate slow down as the mountain cool breeze washes over you.',
        floraFeature: 'Alpine Grassy Meadow & Wild Dandelions'
      }
    ]
  },
  {
    id: 'trail-pashan-lake',
    name: 'Pashan Lake Bamboo & Wetland Sanctuary',
    region: 'Pashan, Pune',
    distanceKm: 4.2,
    elevationGainM: 35,
    difficulty: 'Easy / Flat',
    canopyCoverPct: 82,
    foliageStatus: 'Golden Reeds, Water Lilies & Bamboos',
    foliageIndex: 88,
    foliagePalette: ['#15803d', '#ca8a04', '#0284c7'],
    primarySpecies: ['Giant Golden Bamboo', 'Weeping Willow', 'Jamun', 'Karanj'],
    wildlifeHighlights: ['Painted Storks', 'Honeybees on Wild Acacia', 'Kingfishers', 'Meadow Butterflies'],
    surfaceType: 'Flat Packed Soil & Bamboo Leaf Bedding',
    trafficLevel: 'Low / Serene',
    bestTimeOfDay: 'Sunrise (06:00 - 07:30)',
    coordinates: [
      [18.5320, 73.7820],
      [18.5340, 73.7845],
      [18.5365, 73.7860],
      [18.5385, 73.7840],
      [18.5400, 73.7815],
      [18.5375, 73.7795],
      [18.5350, 73.7785],
      [18.5330, 73.7800],
      [18.5320, 73.7820]
    ],
    description: 'A tranquil wetland running loop winding through soaring golden bamboo groves, jamun orchards, and misty water lily bays where migratory birds glide in the morning fog.',
    audioCheckpoints: [
      {
        km: 0.1,
        title: 'Bamboo Trail Gate: Screen in Pocket',
        cue: 'Starting by the bamboo groves of Pashan Lake. Screen off. The air is humid and rich with the scent of freshwater reeds.',
        sensoryPrompt: 'Listen to the bamboo stalks creaking gently against each other in the breeze.',
        floraFeature: 'Bambusa vulgaris (Golden Bamboo)'
      },
      {
        km: 1.4,
        title: 'Kingfisher Marsh & Jamun Canopy',
        cue: 'Running under ancient purple Jamun trees. The ground is carpeted with fallen leaves.',
        sensoryPrompt: 'Listen for the sharp whistling chirp of the white-throated kingfisher diving into the lake.',
        floraFeature: 'Syzygium cumini (Indian Jamun)'
      },
      {
        km: 2.8,
        title: 'Wild Honeybee Acacia Grove',
        cue: 'Yellow puffball acacia blossoms overhead. Honeybees are busily humming among the flowers.',
        sensoryPrompt: 'Notice the golden morning light filtering through the tree canopy onto the water.',
        floraFeature: 'Acacia nilotica (Gum Arabic Tree)'
      },
      {
        km: 3.9,
        title: 'Lotus Bay Homestretch',
        cue: 'Final 300 meters on the flat lake bund. Water lilies cover the shallows.',
        sensoryPrompt: 'Allow your shoulders to drop, relax your jaw, and finish with smooth easy strides.',
        floraFeature: 'Sacred Water Lilies & Bulrushes'
      }
    ]
  },
  {
    id: 'trail-baner-hill',
    name: 'Baner Hill & Windmill Plateau Ridge',
    region: 'Baner / Pashan Link, Pune',
    distanceKm: 5.2,
    elevationGainM: 165,
    difficulty: 'Moderate',
    canopyCoverPct: 70,
    foliageStatus: 'Wild Yellow Cassia & Grassy Crests',
    foliageIndex: 89,
    foliagePalette: ['#16a34a', '#eab308', '#ea580c'],
    primarySpecies: ['Cassia fistula (Amaltas)', 'Subabul', 'Bougainvillea', 'Peepal'],
    wildlifeHighlights: ['Butterflies (Lime & Swallowtail)', 'Indian Hares', 'Partridges', 'Honeybees'],
    surfaceType: 'Red Soil, Rock Outcrops & Grassy Paths',
    trafficLevel: 'Low (Local Trail Enthusiasts)',
    bestTimeOfDay: 'Early Morning (06:00 - 08:00)',
    coordinates: [
      [18.5490, 73.7850],
      [18.5515, 73.7870],
      [18.5540, 73.7895],
      [18.5565, 73.7910],
      [18.5580, 73.7890],
      [18.5555, 73.7865],
      [18.5530, 73.7840],
      [18.5505, 73.7830],
      [18.5490, 73.7850]
    ],
    description: 'An invigorating ridge trail connecting Baner Hill to Pashan Hill. Runs along open flower-covered crests with fluttering swallowtail butterflies, flowering amaltas trees, and 360-degree views of Pune city.',
    audioCheckpoints: [
      {
        km: 0.1,
        title: 'Baner Footstep Start: Phone Away',
        cue: 'Welcome to Baner Hill. Put your phone away. The initial climb brings an instant release of morning endorphins.',
        sensoryPrompt: 'Smell the crushed wild grass and warming red earth under your shoes.',
        floraFeature: 'Wild Cassia & Lantana Wildflower Beds'
      },
      {
        km: 2.1,
        title: 'Tukaram Paduka Temple Ridge',
        cue: 'Reaching the stone paduka shrine on the ridge. Windmill blades hum quietly to the north.',
        sensoryPrompt: 'Watch pairs of bright yellow swallowtail butterflies dancing above the flowering bushes.',
        floraFeature: 'Sacred Peepal & Flowering Champa'
      },
      {
        km: 3.8,
        title: 'The Grassy Butterfly Spine',
        cue: 'A fast, undulating plateau run with views of the highway fading into distant mist.',
        sensoryPrompt: 'Feel the morning sun on your skin and the cool crosswind from the valley.',
        floraFeature: 'Golden Sahyadri Spear Grass'
      },
      {
        km: 4.9,
        title: 'Banyan Shaded Descent',
        cue: 'Smooth final descent under spreading fig branches.',
        sensoryPrompt: 'Take a long calming exhale. Your morning run on Pune’s hills is complete.',
        floraFeature: 'Wild Fig & Morning Glories'
      }
    ]
  }
];
