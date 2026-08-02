import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const destinations = [
  {
    code: 'US',
    name: 'United States',
    tagline: 'From the New York skyline to the Grand Canyon',
    description:
      'The United States welcomes millions of visitors every year. Whether you are traveling for tourism, business meetings, or visiting family, our experts will guide your application through every step and make sure it is ready before it reaches the consulate.',
    documents: [
      'Valid passport',
      'Digital photo taken within the last six months',
      'Travel itinerary or planned dates',
      'Proof of ties to your home country',
    ],
  },
  {
    code: 'EU',
    name: 'Schengen Area (Europe)',
    tagline: 'One visa, twenty-nine European countries',
    description:
      'A Schengen visa lets you move freely across most of Europe with a single document — from Lisbon to Helsinki. We help you choose the right consulate, prepare the paperwork, and avoid the most common mistakes that lead to refusals.',
    documents: [
      'Valid passport',
      'Recent passport-size photo',
      'Travel medical insurance',
      'Proof of accommodation and itinerary',
    ],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    tagline: 'Dubai, Abu Dhabi and beyond',
    description:
      'The UAE offers a fully electronic visa — no embassy visit required. Complete our simple form, and your document will arrive by email, ready to present at the border on your phone or as a printout.',
    documents: [
      'Valid passport',
      'Digital passport-style photo',
      'Scan of your passport information page',
    ],
  },
  {
    code: 'IN',
    name: 'India',
    tagline: 'The Taj Mahal, Kerala backwaters and vibrant cities',
    description:
      'India issues electronic visas for tourism, business, and medical travel. The application is entirely online, and our team reviews every answer before submission so you can travel with confidence.',
    documents: [
      'Valid passport',
      'Digital photo with a white background',
      'Scan of your passport information page',
    ],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    tagline: 'London calling — and Scotland, Wales and beyond',
    description:
      'Most visitors to the UK now need an Electronic Travel Authorisation (ETA). It is linked digitally to your passport, and the application takes only a few minutes with our guided form.',
    documents: [
      'Valid passport',
      'Digital photo of your face',
      'Contact and travel details',
    ],
  },
  {
    code: 'CA',
    name: 'Canada',
    tagline: 'Wild nature and welcoming cities',
    description:
      'Travelers flying to Canada need an Electronic Travel Authorization (eTA) linked to their passport. Our simplified form and expert review help you avoid errors that could delay your trip.',
    documents: [
      'Valid passport',
      'Email address',
      'Basic travel and employment details',
    ],
  },
  {
    code: 'TR',
    name: 'Turkey',
    tagline: 'Where East meets West',
    description:
      'Turkey offers one of the fastest electronic visas in the world. Apply online, receive the document by email, and show it at passport control — it is that simple.',
    documents: [
      'Valid passport',
      'Email address',
      'Supporting document if required for your nationality',
    ],
  },
  {
    code: 'JP',
    name: 'Japan',
    tagline: 'Tradition and technology side by side',
    description:
      'Japan has introduced an electronic visa for tourists from eligible countries. We handle the details of the online process so you can focus on planning your itinerary — from Tokyo to Kyoto.',
    documents: [
      'Valid passport',
      'Digital passport-style photo',
      'Proof of accommodation in Japan',
    ],
  },
]

async function main() {
  for (const d of destinations) {
    await prisma.destination.upsert({
      where: { code: d.code },
      update: {
        name: d.name,
        tagline: d.tagline,
        description: d.description,
        documents: JSON.stringify(d.documents),
      },
      create: {
        code: d.code,
        name: d.name,
        tagline: d.tagline,
        description: d.description,
        documents: JSON.stringify(d.documents),
      },
    })
  }
  console.log(`Seeded ${destinations.length} destinations`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
