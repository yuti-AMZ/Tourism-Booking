import { prisma } from "../lib/prisma.js";

const destinations = [
  {
    slug: "lalibela",
    title: "Lalibela Rock-Hewn Churches",
    description: "A UNESCO World Heritage site, famous for its monolithic rock-cut churches.",
    location: "Lalibela, Ethiopia",
    price: 100,
    images: ["/images/lalibela.jpg"],
    category: "Heritage",
    rating: 5,
  },
  {
    slug: "simien-mountains",
    title: "Simien Mountains",
    description: "Stunning mountain range and national park, home to unique wildlife.",
    location: "Simien Mountains, Ethiopia",
    price: 120,
    images: ["/images/Simien-mountains.jpg"],
    category: "Landscape",
    rating: 5,
  },
  {
    slug: "danakil",
    title: "Danakil Depression",
    description: "One of the hottest and lowest places on Earth, with colorful landscapes.",
    location: "Danakil, Ethiopia",
    price: 150,
    images: ["/images/denakil.jpg"],
    category: "Landscape",
    rating: 4.5,
  },
  {
    slug: "omo-valley",
    title: "Omo Valley Tribes",
    description: "Cultural region known for its diverse tribes and traditions.",
    location: "Omo Valley, Ethiopia",
    price: 110,
    images: ["/images/omo.jpg"],
    category: "Culture",
    rating: 4.8,
  },
  {
    slug: "gondar",
    title: "Gondar Royal Enclosure",
    description: "Historic castles and palaces of Ethiopian emperors.",
    location: "Gondar, Ethiopia",
    price: 90,
    images: ["/images/gondar.jpg"],
    category: "Heritage",
    rating: 4.7,
  },
  {
    slug: "entoto-hills",
    title: "Entoto Hills, Addis Ababa",
    description: "Scenic hills overlooking Addis Ababa, with churches and forests.",
    location: "Addis Ababa, Ethiopia",
    price: 60,
    images: ["/images/entonto.jpg"],
    category: "City",
    rating: 4.2,
  },
  {
    slug: "ethiopian-highlands",
    title: "Ethiopian Highlands",
    description: "Dramatic highland landscapes, often called the Roof of Africa.",
    location: "Ethiopia",
    price: 130,
    images: ["/images/ethio landscape.jpg"],
    category: "Landscape",
    rating: 4.9,
  },
  {
    slug: "harar",
    title: "Harar Old City",
    description: "Ancient walled city, known for its colorful markets and hyena feeding tradition.",
    location: "Harar, Ethiopia",
    price: 80,
    images: ["/images/harar.jpg"],
    category: "Culture",
    rating: 4.6,
  },
  {
    slug: "bale-mountains",
    title: "Bale Mountains",
    description: "National park with unique wildlife and beautiful scenery.",
    location: "Bale, Ethiopia",
    price: 140,
    images: ["/images/Bale Mountains.jpg"],
    category: "Wildlife",
    rating: 4.8,
  },
  {
    slug: "axum-obelisks",
    title: "Axum Obelisks",
    description: "Ancient stelae and archaeological sites in the city of Axum.",
    location: "Axum, Ethiopia",
    price: 95,
    images: ["/images/Axum.jpg"],
    category: "Heritage",
    rating: 4.5,
  },
  {
    slug: "ancient-axum",
    title: "Ancient Axum",
    description: "Historic city, once the center of the Axumite Empire.",
    location: "Axum, Ethiopia",
    price: 100,
    images: ["/images/Axum1.jpg"],
    category: "Heritage",
    rating: 4.4,
  },
  {
    slug: "ethiopian-flag",
    title: "Ethiopian Flag",
    description: "Symbolic landmark and photo spot for the Ethiopian flag.",
    location: "Ethiopia",
    price: 10,
    images: ["/images/flag-ethiopia.jpg"],
    category: "Culture",
    rating: 4.0,
  },
];

async function main() {
  for (const dest of destinations) {
    await prisma.destination.create({ data: dest });
    console.log(`Added: ${dest.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
