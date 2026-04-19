import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  // Delete related records first, then destinations
  await prisma.review.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.destination.deleteMany({});
  console.log("🗑️  Cleared existing destinations and related records");

  const destinations = [
    {
      slug: "lalibela-rock-churches",
      title: "Lalibela – Rock-Hewn Churches",
      description: "Lalibela is home to 11 medieval monolithic churches carved directly from solid red volcanic rock. A UNESCO World Heritage Site and one of Africa's most sacred pilgrimage destinations, often called the 'New Jerusalem' of Africa.",
      location: "Lalibela, Amhara Region",
      price: 120,
      category: "Heritage",
      images: ["/images/lalibela.jpg"],
      rating: 4.9,
    },
    {
      slug: "simien-mountains",
      title: "Simien Mountains National Park",
      description: "A UNESCO World Heritage Site featuring dramatic escarpments, deep valleys, and sharp peaks. Home to the endangered Gelada baboon, Ethiopian wolf, and Walia ibex. Offers some of Africa's most spectacular trekking.",
      location: "Gondar, Amhara Region",
      price: 95,
      category: "Adventure",
      images: ["/images/Simien Mountains, Ethiopia.jpg"],
      rating: 4.8,
    },
    {
      slug: "danakil-depression",
      title: "Danakil Depression",
      description: "One of the hottest and most alien landscapes on Earth. The Danakil Depression features colorful sulfur springs, lava lakes, and salt flats. A truly otherworldly adventure for the bold traveler.",
      location: "Afar Region",
      price: 150,
      category: "Adventure",
      images: ["/images/denakil.jpg"],
      rating: 4.7,
    },
    {
      slug: "addis-ababa-city",
      title: "Addis Ababa – Capital City",
      description: "Ethiopia's vibrant capital sits at 2,400m altitude. Explore the National Museum (home of 'Lucy'), the Merkato — Africa's largest open-air market, the Holy Trinity Cathedral, and world-class Ethiopian cuisine.",
      location: "Addis Ababa",
      price: 80,
      category: "City",
      images: ["/images/entonto.jpg"],
      rating: 4.5,
    },
    {
      slug: "omo-valley-tribes",
      title: "Omo Valley – Tribal Culture",
      description: "The Omo Valley is home to over 50 indigenous tribes including the Mursi, Hamar, and Karo peoples. Experience ancient traditions, colorful ceremonies, and a way of life unchanged for centuries.",
      location: "Southern Nations Region",
      price: 130,
      category: "Culture",
      images: ["/images/omo.jpg"],
      rating: 4.8,
    },
    {
      slug: "gondar-royal-enclosure",
      title: "Gondar – Royal Enclosure",
      description: "Known as the 'Camelot of Africa', Gondar was Ethiopia's imperial capital in the 17th century. The Royal Enclosure contains six castles and palaces built by successive emperors, a UNESCO World Heritage Site.",
      location: "Gondar, Amhara Region",
      price: 85,
      category: "Heritage",
      images: ["/images/gondar.jpg"],
      rating: 4.6,
    },
    {
      slug: "bale-mountains",
      title: "Bale Mountains National Park",
      description: "Home to the largest population of Ethiopian wolves in the world. The Sanetti Plateau is Africa's largest Afroalpine ecosystem. Trek through giant heather forests and spot mountain nyala and rare birds.",
      location: "Oromia Region",
      price: 110,
      category: "Wildlife",
      images: ["/images/Bale Mountains.jpg"],
      rating: 4.7,
    },
    {
      slug: "axum-ancient-city",
      title: "Axum – Ancient Obelisks",
      description: "Axum was the capital of the ancient Aksumite Empire. Visit towering obelisks, underground tombs, and the Church of St. Mary of Zion — said to house the Ark of the Covenant.",
      location: "Tigray Region",
      price: 100,
      category: "Heritage",
      images: ["/images/Axum.jpg"],
      rating: 4.8,
    },
    {
      slug: "harar-old-city",
      title: "Harar – Walled City",
      description: "Harar is one of the holiest cities in Islam and a UNESCO World Heritage Site. Its ancient walled city contains 82 mosques and hundreds of shrines, with a unique culture and the famous hyena feeding tradition.",
      location: "Harari Region",
      price: 90,
      category: "Culture",
      images: ["/images/harar.jpg"],
      rating: 4.6,
    },
  ];

  for (const dest of destinations) {
    await prisma.destination.create({ data: dest });
  }

  console.log(`✅ Seeded ${destinations.length} Ethiopian destinations`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
