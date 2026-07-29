export const SOLAR_SYSTEM_DATA = {
  sun: {
    id: "sun",
    name: "The Sun",
    tagline: "The Star at the Heart of Our Solar System",
    type: "Yellow Dwarf Star (G2V)",
    rankText: "Central Star",
    color: "#ffaa00",
    glowColor: "rgba(255, 170, 0, 0.8)",
    visualRadius: 16,
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.002,
    axialTilt: 7.25,
    specs: {
      diameter: "1,392,700 km (109x Earth)",
      mass: "1.989 × 10³⁰ kg (333,000x Earth)",
      distanceFromSun: "0 AU (Center)",
      surfaceTemp: "5,500 °C (Core: 15 Million °C)",
      gravity: "274 m/s² (28x Earth)",
      dayLength: "25 - 35 Earth Days",
      yearLength: "230 Million Years (Galactic Orbit)",
      moons: "8 Planets + Dwarf Planets"
    },
    atmosphere: "73% Hydrogen, 25% Helium, traces of Oxygen, Carbon, Neon & Iron plasma.",
    description: "The Sun is a yellow dwarf star, a hot ball of glowing gases at the heart of our solar system. Its gravity holds the solar system together, keeping everything—from the biggest planets to the smallest debris—in orbit around it.",
    structure: "Core, Radiative Zone, Convective Zone, Photosphere, Chromosphere, and Corona.",
    moonsList: [],
    funFacts: [
      "The Sun contains 99.86% of all the mass in the entire Solar System.",
      "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth.",
      "About 1.3 million Earths could fit inside the Sun.",
      "The Sun generates energy through nuclear fusion, fusing 600 million tons of hydrogen into helium every second."
    ]
  },
  mercury: {
    id: "mercury",
    name: "Mercury",
    tagline: "The Swift & Cratered Messenger",
    type: "Terrestrial Planet",
    rankText: "1st Planet from Sun",
    color: "#908c8a",
    glowColor: "rgba(144, 140, 138, 0.6)",
    visualRadius: 2.2,
    orbitRadius: 32,
    orbitSpeed: 0.04,
    rotationSpeed: 0.001,
    axialTilt: 0.03,
    specs: {
      diameter: "4,879 km (0.38x Earth)",
      mass: "3.301 × 10²³ kg (0.055x Earth)",
      distanceFromSun: "0.39 AU (57.9 Million km)",
      surfaceTemp: "-180 °C to 430 °C",
      gravity: "3.7 m/s² (0.38x Earth)",
      dayLength: "59 Earth Days",
      yearLength: "88 Earth Days",
      moons: "0"
    },
    atmosphere: "Ultra-thin exosphere composed of Oxygen, Sodium, Hydrogen, Helium, and Potassium.",
    description: "Mercury is the smallest planet in our solar system and the closest to the Sun. It is only slightly larger than Earth's Moon. Its surface is covered in craters from billions of years of meteorite impacts.",
    structure: "Large metallic iron core (~85% of planet radius), silicate mantle, and thin rocky crust.",
    moonsList: [],
    funFacts: [
      "Because Mercury has almost no atmosphere to trap heat, temperatures fluctuate by over 600°C between day and night.",
      "Despite being closest to the Sun, Mercury is NOT the hottest planet (Venus is!).",
      "Mercury zips around the Sun at nearly 47 km/s, faster than any other planet.",
      "A year on Mercury is just 88 days long, but a single day-night cycle takes 176 Earth days!"
    ]
  },
  venus: {
    id: "venus",
    name: "Venus",
    tagline: "Earth's Toxic & Hottest Twin",
    type: "Terrestrial Planet",
    rankText: "2nd Planet from Sun",
    color: "#e3bb76",
    glowColor: "rgba(227, 187, 118, 0.7)",
    visualRadius: 3.8,
    orbitRadius: 48,
    orbitSpeed: 0.015,
    rotationSpeed: -0.0008,
    axialTilt: 177.3,
    specs: {
      diameter: "12,104 km (0.95x Earth)",
      mass: "4.867 × 10²⁴ kg (0.815x Earth)",
      distanceFromSun: "0.72 AU (108.2 Million km)",
      surfaceTemp: "465 °C (Hottest in Solar System)",
      gravity: "8.87 m/s² (0.90x Earth)",
      dayLength: "243 Earth Days",
      yearLength: "225 Earth Days",
      moons: "0"
    },
    atmosphere: "96.5% Carbon Dioxide, 3.5% Nitrogen, with clouds of sulfuric acid.",
    description: "Venus is the second planet from the Sun and Earth's closest planetary neighbor. It has a runaway greenhouse effect making it the hottest world in our solar system, hot enough to melt lead.",
    structure: "Central iron core, rocky silicate mantle, and volcanic basaltic crust.",
    moonsList: [],
    funFacts: [
      "Venus rotates backwards (retrograde) compared to most planets, so the Sun rises in the west and sets in the east.",
      "A day on Venus (243 Earth days) is longer than its entire year (225 Earth days!).",
      "Atmospheric pressure on Venus' surface is 92 times greater than Earth's—equivalent to being 900 meters underwater.",
      "Venus shines so brightly in Earth's night sky that it is often called the 'Morning Star' or 'Evening Star'."
    ]
  },
  earth: {
    id: "earth",
    name: "Earth",
    tagline: "Our Blue Marble & Only Known Haven for Life",
    type: "Terrestrial Planet",
    rankText: "3rd Planet from Sun",
    color: "#2b82c9",
    glowColor: "rgba(43, 130, 201, 0.7)",
    visualRadius: 4.0,
    orbitRadius: 66,
    orbitSpeed: 0.01,
    rotationSpeed: 0.02,
    axialTilt: 23.44,
    specs: {
      diameter: "12,742 km (1.0x Base)",
      mass: "5.972 × 10²⁴ kg (1.0x Base)",
      distanceFromSun: "1.00 AU (149.6 Million km)",
      surfaceTemp: "-89 °C to 58 °C (Avg: 15 °C)",
      gravity: "9.81 m/s² (1.0x Base)",
      dayLength: "24 Hours (23h 56m 4s)",
      yearLength: "365.25 Days",
      moons: "1 (The Moon)"
    },
    atmosphere: "78% Nitrogen, 21% Oxygen, 0.9% Argon, 0.04% Carbon Dioxide & water vapor.",
    description: "Earth is our home planet and the only world known so far to harbor life. It is the fifth largest planet in the solar system and the only world with liquid surface water.",
    structure: "Inner solid nickel-iron core, outer liquid core, mantle, and crust divided into tectonic plates.",
    moonsList: [
      { name: "The Moon (Luna)", diameter: "3,474 km", distance: "384,400 km" }
    ],
    funFacts: [
      "Earth is the only planet not named after a Greek or Roman deity.",
      "71% of Earth's surface is covered by liquid water oceans.",
      "Earth's magnetic field protects us from harmful solar radiation and creates auroras at the poles.",
      "Earth is the densest planet in the Solar System at 5.51 g/cm³."
    ]
  },
  mars: {
    id: "mars",
    name: "Mars",
    tagline: "The Red Planet of Frozen Deserts & Ancient Rivers",
    type: "Terrestrial Planet",
    rankText: "4th Planet from Sun",
    color: "#c84b31",
    glowColor: "rgba(200, 75, 49, 0.7)",
    visualRadius: 2.8,
    orbitRadius: 86,
    orbitSpeed: 0.008,
    rotationSpeed: 0.019,
    axialTilt: 25.19,
    specs: {
      diameter: "6,779 km (0.53x Earth)",
      mass: "6.417 × 10²³ kg (0.107x Earth)",
      distanceFromSun: "1.52 AU (227.9 Million km)",
      surfaceTemp: "-140 °C to 20 °C (Avg: -60 °C)",
      gravity: "3.72 m/s² (0.38x Earth)",
      dayLength: "24 Hours 37 Minutes",
      yearLength: "687 Earth Days",
      moons: "2 (Phobos & Deimos)"
    },
    atmosphere: "95.3% Carbon Dioxide, 2.7% Nitrogen, 1.6% Argon, traces of Oxygen & water vapor.",
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. It earned its red color from iron oxide (rust) in its soil. Mars has polar ice caps, extinct volcanoes, and canyon systems.",
    structure: "Dense core of iron, nickel & sulfur, silicate mantle, and iron-rich basalt crust.",
    moonsList: [
      { name: "Phobos", diameter: "22.5 km", distance: "9,377 km" },
      { name: "Deimos", diameter: "12.4 km", distance: "23,460 km" }
    ],
    funFacts: [
      "Mars is home to Olympus Mons, the largest volcano in the Solar System—3x higher than Mount Everest!",
      "Valles Marineris on Mars is a canyon system that spans over 4,000 km, swallowing the Grand Canyon effortlessly.",
      "Sunsets on Mars appear blue due to how fine dust particles scatter light in the thin atmosphere.",
      "Robotic rovers like Curiosity and Perseverance are currently exploring Mars searching for signs of ancient microbial life."
    ]
  },
  asteroidBelt: {
    id: "asteroidBelt",
    name: "Asteroid Belt",
    tagline: "The Ring of Ancient Planetary Building Blocks",
    type: "Circumstellar Debris Belt",
    rankText: "Between Mars & Jupiter (2.2 – 3.2 AU)",
    color: "#a89f91",
    glowColor: "rgba(168, 159, 145, 0.8)",
    visualRadius: 4.5,
    orbitRadius: 104,
    orbitSpeed: 0.005,
    rotationSpeed: 0.005,
    axialTilt: 0,
    specs: {
      diameter: "150 Million km Wide (Ring)",
      mass: "2.39 × 10²¹ kg (~3% of Earth's Moon)",
      distanceFromSun: "2.2 – 3.2 AU (329 – 478 Million km)",
      surfaceTemp: "-73 °C to -108 °C",
      gravity: "Varies (0.27 m/s² on Ceres)",
      dayLength: "Varies by asteroid",
      yearLength: "3 to 6 Earth Years",
      moons: "Hundreds of minor asteroid moons!"
    },
    atmosphere: "None (Vacuum of deep space).",
    description: "The Main Asteroid Belt is a massive torus-shaped ring in our Solar System located between the orbits of Mars and Jupiter. It is populated by over 1 million rocky and metallic bodies left over from the early accretion disk 4.6 billion years ago.",
    structure: "Composed of C-type (carbonaceous, 75%), S-type (silicates/stony, 17%), and M-type (metallic nickel-iron, 8%) asteroids. Over 50% of the belt's total mass resides in just 4 bodies: Ceres, Vesta, Pallas, and Hygiea.",
    moonsList: [
      { name: "Ceres (Dwarf Planet)", diameter: "939 km (39% of Belt Mass)", distance: "2.77 AU from Sun" },
      { name: "Vesta", diameter: "525 km (Brightest Asteroid)", distance: "2.36 AU from Sun" },
      { name: "Pallas", diameter: "512 km", distance: "2.77 AU from Sun" },
      { name: "Hygiea", diameter: "434 km", distance: "3.14 AU from Sun" }
    ],
    funFacts: [
      "Despite what sci-fi movies depict, the asteroid belt is mostly empty space—the average distance between asteroids is about 1 million km!",
      "Jupiter's intense gravitational force prevented these protoplanetary rocks from combining into a full planet.",
      "If you gathered every single asteroid in the main belt into one sphere, it would still be smaller than Earth's Moon.",
      "NASA spacecraft like Dawn and OSIRIS-REx have orbited and retrieved physical rock samples directly from asteroids!"
    ]
  },
  jupiter: {
    id: "jupiter",
    name: "Jupiter",
    tagline: "The Giant Sovereign of Swirling Storms",
    type: "Gas Giant",
    rankText: "5th Planet from Sun",
    color: "#d4a373",
    glowColor: "rgba(212, 163, 115, 0.7)",
    visualRadius: 9.5,
    orbitRadius: 118,
    orbitSpeed: 0.004,
    rotationSpeed: 0.04,
    axialTilt: 3.13,
    specs: {
      diameter: "139,820 km (11.2x Earth)",
      mass: "1.898 × 10²⁷ kg (318x Earth)",
      distanceFromSun: "5.20 AU (778.5 Million km)",
      surfaceTemp: "-110 °C (Cloud Tops)",
      gravity: "24.79 m/s² (2.53x Earth)",
      dayLength: "9 Hours 55 Minutes",
      yearLength: "11.86 Earth Years",
      moons: "95 (Galilean Moons: Io, Europa, Ganymede, Callisto)"
    },
    atmosphere: "89% Hydrogen, 10% Helium, traces of Methane, Ammonia, Water Vapor & Phosphine.",
    description: "Jupiter is more than twice as massive as all the other planets in our solar system combined. Its iconic Great Red Spot is a storm bigger than Earth that has raged for hundreds of years.",
    structure: "Dense liquid metallic hydrogen mantle surrounding a dense core of rock & ice, under extreme pressure.",
    moonsList: [
      { name: "Ganymede", diameter: "5,268 km (Largest Moon in Solar System)", distance: "1,070,400 km" },
      { name: "Callisto", diameter: "4,821 km", distance: "1,882,700 km" },
      { name: "Io", diameter: "3,643 km (Most Volcanic Body)", distance: "421,700 km" },
      { name: "Europa", diameter: "3,122 km (Subsurface Ocean)", distance: "670,900 km" }
    ],
    funFacts: [
      "Jupiter has the shortest day of any planet in the solar system, rotating once every 9 hours and 55 minutes.",
      "The Great Red Spot is an anticyclonic storm larger than Earth that has been observed for over 350 years.",
      "Jupiter's moon Europa contains a vast subsurface ocean beneath its icy crust with twice as much water as Earth!",
      "Jupiter acts as a giant cosmic shield, using its gravitational pull to deflect asteroids away from inner planets."
    ]
  },
  saturn: {
    id: "saturn",
    name: "Saturn",
    tagline: "The Crown Jewel of Golden Rings",
    type: "Gas Giant",
    rankText: "6th Planet from Sun",
    color: "#e6c594",
    glowColor: "rgba(230, 197, 148, 0.7)",
    visualRadius: 8.0,
    orbitRadius: 152,
    orbitSpeed: 0.003,
    rotationSpeed: 0.038,
    axialTilt: 26.73,
    hasRings: true,
    specs: {
      diameter: "116,460 km (9.4x Earth)",
      mass: "5.683 × 10²⁶ kg (95x Earth)",
      distanceFromSun: "9.58 AU (1.43 Billion km)",
      surfaceTemp: "-140 °C (Cloud Tops)",
      gravity: "10.44 m/s² (1.07x Earth)",
      dayLength: "10 Hours 33 Minutes",
      yearLength: "29.45 Earth Years",
      moons: "146 (Titan, Enceladus, Mimas, etc.)"
    },
    atmosphere: "96.3% Hydrogen, 3.2% Helium, 0.4% Methane, Ammonia & Ethane.",
    description: "Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. It is a gas giant made mostly of hydrogen and helium, surrounded by a complex system of ice and rock rings.",
    structure: "Small rocky core, liquid metallic hydrogen layer, molecular hydrogen outer shell.",
    moonsList: [
      { name: "Titan", diameter: "5,150 km (Has Dense Atmosphere & Methane Lakes)", distance: "1,221,870 km" },
      { name: "Enceladus", diameter: "504 km (Ice Geysers & Ocean)", distance: "238,000 km" },
      { name: "Mimas", diameter: "396 km ('Death Star' Crater)", distance: "185,520 km" }
    ],
    funFacts: [
      "Saturn is the only planet in our solar system that is less dense than water (0.687 g/cm³)—it would float in a giant bathtub!",
      "Saturn's rings are made almost entirely of pure water ice chunks ranging from tiny dust grains to mountain-sized icebergs.",
      "Saturn has a perpetual hexagonal storm pattern swirling at its north pole.",
      "Saturn's moon Titan is the only moon in our solar system with a thick atmosphere and liquid lakes of methane."
    ]
  },
  uranus: {
    id: "uranus",
    name: "Uranus",
    tagline: "The Tilted Aquamarine Ice Giant",
    type: "Ice Giant",
    rankText: "7th Planet from Sun",
    color: "#6bd2db",
    glowColor: "rgba(107, 210, 219, 0.7)",
    visualRadius: 5.5,
    orbitRadius: 184,
    orbitSpeed: 0.002,
    rotationSpeed: -0.025,
    axialTilt: 97.77,
    hasRings: true,
    specs: {
      diameter: "50,724 km (4.0x Earth)",
      mass: "8.681 × 10²⁵ kg (14.5x Earth)",
      distanceFromSun: "19.22 AU (2.87 Billion km)",
      surfaceTemp: "-224 °C (Coldest Planet Atmosphere)",
      gravity: "8.69 m/s² (0.89x Earth)",
      dayLength: "17 Hours 14 Minutes",
      yearLength: "84 Earth Years",
      moons: "28 (Titania, Oberon, Miranda, Ariel, Umbriel)"
    },
    atmosphere: "83% Hydrogen, 15% Helium, 2.3% Methane (gives it its cyan blue tint).",
    description: "Uranus is an ice giant planet with a striking aquamarine color caused by methane in its upper atmosphere. It is famous for rotating almost completely on its side, likely caused by an ancient collision.",
    structure: "Small rocky core surrounded by a hot, dense fluid mantle of water, ammonia, and methane ice.",
    moonsList: [
      { name: "Titania", diameter: "1,578 km", distance: "435,900 km" },
      { name: "Oberon", diameter: "1,523 km", distance: "583,500 km" },
      { name: "Miranda", diameter: "471 km (Extreme Fractured Canyons)", distance: "129,900 km" }
    ],
    funFacts: [
      "Uranus rotates at an extreme 98-degree tilt—it basically rolls around the Sun on its side!",
      "Due to its tilt, each pole of Uranus experiences 42 years of continuous sunlight followed by 42 years of darkness.",
      "Uranus holds the record for the coldest recorded atmospheric temperature in the Solar System (-224 °C).",
      "Uranus was the first planet discovered with the use of a telescope, found by William Herschel in 1781."
    ]
  },
  neptune: {
    id: "neptune",
    name: "Neptune",
    tagline: "The Windswept Deep-Blue Ice Giant",
    type: "Ice Giant",
    rankText: "8th Planet from Sun",
    color: "#3861fb",
    glowColor: "rgba(56, 97, 251, 0.7)",
    visualRadius: 5.2,
    orbitRadius: 214,
    orbitSpeed: 0.0015,
    rotationSpeed: 0.027,
    axialTilt: 28.32,
    hasRings: true,
    specs: {
      diameter: "49,244 km (3.9x Earth)",
      mass: "1.024 × 10²⁶ kg (17.1x Earth)",
      distanceFromSun: "30.05 AU (4.50 Billion km)",
      surfaceTemp: "-218 °C",
      gravity: "11.15 m/s² (1.14x Earth)",
      dayLength: "16 Hours 6 Minutes",
      yearLength: "164.8 Earth Years",
      moons: "16 (Triton, Proteus, Nereid)"
    },
    atmosphere: "80% Hydrogen, 19% Helium, 1.5% Methane, with frozen ammonia clouds.",
    description: "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the most distant major planet in our solar system. More than 30 times as far from the Sun as Earth, Neptune's deep blue color comes from methane.",
    structure: "Heavy rocky core surrounded by an ocean mantle of icy water, methane, and ammonia under immense pressure.",
    moonsList: [
      { name: "Triton", diameter: "2,706 km (Retrograde Orbit & Nitrogen Geysers)", distance: "354,759 km" },
      { name: "Proteus", diameter: "420 km", distance: "117,647 km" }
    ],
    funFacts: [
      "Neptune has the fastest winds recorded anywhere in the Solar System, reaching up to 2,100 km/h (1,300 mph)!",
      "Neptune was the first planet located using mathematical calculations before being observed through a telescope.",
      "Neptune's largest moon Triton orbits the planet in the opposite direction of Neptune's rotation (retrograde orbit).",
      "Since its discovery in 1846, Neptune completed its first full orbit around the Sun in 2011!"
    ]
  },
  pluto: {
    id: "pluto",
    name: "Pluto",
    tagline: "The Beloved Icy Realm of the Kuiper Belt",
    type: "Dwarf Planet",
    rankText: "Kuiper Belt Dwarf Planet",
    color: "#bba58e",
    glowColor: "rgba(187, 165, 142, 0.6)",
    visualRadius: 1.5,
    orbitRadius: 242,
    orbitSpeed: 0.001,
    rotationSpeed: -0.003,
    axialTilt: 122.5,
    specs: {
      diameter: "2,377 km (0.18x Earth)",
      mass: "1.303 × 10²² kg (0.002x Earth)",
      distanceFromSun: "39.48 AU (5.9 Billion km)",
      surfaceTemp: "-230 °C",
      gravity: "0.62 m/s² (0.06x Earth)",
      dayLength: "6.4 Earth Days",
      yearLength: "248 Earth Years",
      moons: "5 (Charon, Nix, Hydra, Kerberos, Styx)"
    },
    atmosphere: "Thin atmosphere of Nitrogen, Methane, and Carbon Monoxide that freezes as it moves away from the Sun.",
    description: "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond Neptune. Reclassified as a dwarf planet in 2006, Pluto captured the world's imagination in 2015 when NASA's New Horizons spacecraft revealed its heart-shaped glacier.",
    structure: "Rocky core covered by a thick mantle of water ice and surface nitrogen/methane ice.",
    moonsList: [
      { name: "Charon", diameter: "1,212 km (Half the size of Pluto!)", distance: "19,640 km" },
      { name: "Nix", diameter: "49 km", distance: "48,694 km" },
      { name: "Hydra", diameter: "51 km", distance: "64,738 km" }
    ],
    funFacts: [
      "Pluto has a famous heart-shaped glacier named Tombaugh Regio made of nitrogen and methane ice.",
      "Pluto and its largest moon Charon form a binary system—they lock faces and orbit a common barycenter in space!",
      "Pluto's orbit is so eccentric that for 20 years of its 248-year orbit (like from 1979 to 1999), it was actually closer to the Sun than Neptune!",
      "A person weighing 70 kg on Earth would weigh only 4.3 kg on Pluto."
    ]
  }
};

export const PLANETS_ORDER = [
  "sun", "mercury", "venus", "earth", "mars", "asteroidBelt", "jupiter", "saturn", "uranus", "neptune", "pluto"
];
