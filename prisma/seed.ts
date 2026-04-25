import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const destinations = [
  {
    slug: "lalibela-rock-hewn-churches",
    title: "Lalibela Rock-Hewn Churches",
    description:
      "Lalibela is one of Ethiopia's most sacred destinations, famous for its medieval churches carved directly into volcanic rock. Travelers come for pilgrimage history, spiritual atmosphere, and extraordinary architecture that feels unlike anywhere else in the world.",
    location: "Lalibela, Amhara Region",
    price: 120,
    category: "Heritage",
    images: ["/images/lalibela.jpg"],
    rating: 4.9,
  },
  {
    slug: "simien-mountains-national-park",
    title: "Simien Mountains National Park",
    description:
      "The Simien Mountains offer dramatic cliffs, deep valleys, and some of the best trekking scenery in Africa. It is a UNESCO World Heritage Site known for gelada baboons, highland wildlife, and sweeping mountain views.",
    location: "Simien Mountains, Amhara Region",
    price: 95,
    category: "Adventure",
    images: ["/images/Simien-mountains.jpg"],
    rating: 4.8,
  },
  {
    slug: "danakil-depression",
    title: "Danakil Depression",
    description:
      "The Danakil Depression is one of the hottest and most surreal landscapes on Earth, with colorful sulfur fields, salt flats, and volcanic activity. It is built for travelers looking for a bold, extreme, and unforgettable expedition.",
    location: "Afar Region",
    price: 150,
    category: "Adventure",
    images: ["/images/denakil.jpg"],
    rating: 4.7,
  },
  {
    slug: "entoto-hills",
    title: "Entoto Hills",
    description:
      "Entoto Hills rise above Addis Ababa with eucalyptus forests, cooler air, panoramic city views, and important imperial history. It is a great destination for visitors who want nature, local culture, and a calm escape near the capital.",
    location: "Addis Ababa",
    price: 70,
    category: "Nature",
    images: ["/images/entonto.jpg"],
    rating: 4.5,
  },
  {
    slug: "ethiopian-highlands",
    title: "Ethiopian Highlands",
    description:
      "The Ethiopian Highlands are defined by rolling ridges, vast green landscapes, and a sense of scale that makes every journey feel cinematic. This destination is ideal for scenic drives, photography, and travelers who want to experience Ethiopia's natural beauty.",
    location: "Ethiopian Highlands",
    price: 105,
    category: "Landscape",
    images: ["/images/ethio landscape.jpg"],
    rating: 4.6,
  },
  {
    slug: "gondar-royal-enclosure",
    title: "Gondar Royal Enclosure",
    description:
      "Gondar was once Ethiopia's imperial capital and remains one of the country's most important historic cities. The Royal Enclosure is famous for its castles, palaces, and strong connection to Ethiopia's royal legacy.",
    location: "Gondar, Amhara Region",
    price: 85,
    category: "Heritage",
    images: ["/images/gondar.jpg"],
    rating: 4.6,
  },
  {
    slug: "harar-old-walled-city",
    title: "Harar Old Walled City",
    description:
      "Harar is a UNESCO-listed city celebrated for its walled historic center, colorful alleyways, Islamic heritage, and distinctive local culture. It is one of the most character-rich urban destinations in Ethiopia.",
    location: "Harar, Harari Region",
    price: 90,
    category: "Culture",
    images: ["/images/harar.jpg"],
    rating: 4.6,
  },
  {
    slug: "omo-valley-cultural-journey",
    title: "Omo Valley Cultural Journey",
    description:
      "The Omo Valley is known for its diverse communities, ceremonies, dress traditions, and deep cultural heritage. This destination offers a rare chance to learn about living traditions shaped across generations.",
    location: "Omo Valley, Southern Ethiopia",
    price: 130,
    category: "Culture",
    images: ["/images/omo.jpg"],
    rating: 4.8,
  },
  {
    slug: "bale-mountains-national-park",
    title: "Bale Mountains National Park",
    description:
      "Bale Mountains National Park is one of Ethiopia's best wildlife and trekking destinations, home to the Ethiopian wolf, afroalpine plateaus, and misty forests. It is perfect for nature lovers who want cooler air and rare biodiversity.",
    location: "Oromia Region",
    price: 110,
    category: "Wildlife",
    images: ["/images/Bale Mountains.jpg"],
    rating: 4.7,
  },
  {
    slug: "axum-obelisks",
    title: "Axum Obelisks",
    description:
      "Axum was the heart of an ancient kingdom that shaped the history of the Horn of Africa. The giant stone obelisks and archaeological remains make it one of Ethiopia's most important historical destinations.",
    location: "Axum, Tigray Region",
    price: 100,
    category: "Heritage",
    images: ["/images/Axum.jpg", "/images/Axum1.jpg"],
    rating: 4.8,
  },
];

async function main() {
  await prisma.review.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.destination.deleteMany({});
  console.log("Cleared existing destinations and related records");

  for (const destination of destinations) {
    await prisma.destination.create({
      data: destination,
    });
  }

  console.log(`Seeded ${destinations.length} destinations from local project images`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
