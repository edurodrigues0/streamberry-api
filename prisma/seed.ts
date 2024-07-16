import { prisma } from "@/lib/prisma";

async function seed() {
  await prisma.genre.createMany({
    data: [
      { id: 1, name: "Ação" },
      { id: 2, name: "Aventura" },
      { id: 3, name: "Comédia" },
      { id: 4, name: "Documentário" },
      { id: 5, name: "Drama" },
      { id: 6, name: "Fantasia" },
      { id: 7, name: "Ficção científica" },
      { id: 8, name: "Guerra" },
      { id: 9, name: "Mistério" },
      { id: 10, name: "Musical" },
      { id: 11, name: "Policial" },
      { id: 12, name: "Romance" },
      { id: 13, name: "Terror" },
      { id: 14, name: "Thriller" },
    ]
  })

  await prisma.streaming.createMany({
    data: [
      { id: 1, name: "Netflix" },
      { id: 2, name: "Amazon Prime Video" },
      { id: 3, name: "Disney+" },
      { id: 4, name: "HBO Max" },
      { id: 5, name: "Apple TV+" }
    ]
  })

  const movie = await prisma.movie.create({
    data: {
      title: "Esquema de Risco: Operção Fortune",
      releaseDate: new Date("2023-01-12"),
      genres: {
        connect: { id: 1 },
      },
    }
  })

  await prisma.user.create({
    data: {
      id: "25b396ac-53b0-4a1f-a77e-74305ecb4b8b",
      role: 'ADMIN',
      username: "John Doe",
      email: "johndoe@example.com",
      password: "$2a$06$lzYKMziZVFtj/nHYRhRQg.vpuWen/bR23pdY2rYXsIS/q79LxYWxu",
      reviews: {
        create: {
          movieId: movie.id,
          rating: 5,
          comment: "Melhor trabalho de Ritchie desde o subestimado O Agente da U.N.C.L.E., Esquema de Risco é a diversão despretensiosa que tanta falta faz no mundo das grandes franquias e uma bem-vinda volta por cima para a carreira do cineast",
        }
      }
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
})