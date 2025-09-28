import * as React from "react"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type Pet = {
  id: string
  name: string
  age: number
  distance: string
  photo: string
  bio: string
  link: string
}

const pets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    age: 2,
    distance: '3 miles away',
    photo: 'https://placedog.net/500/400?id=1',
    bio: 'Loves belly rubs, car rides, and barking at squirrels. Not a fan of the vacuum.',
    link: "https://www.petfinder.com/"
  },
  {
    id: '2',
    name: 'Luna',
    age: 1,
    distance: '1 mile away',
    photo: 'https://placedog.net/500/400?id=2',
    bio: 'Queen of naps. Enjoys sunbathing, head scratches, and judging your life choices.',
    link: "https://www.petfinder.com/"
  },
  {
    id: '3',
    name: 'Max',
    age: 4,
    distance: '5 miles away',
    photo: 'https://placedog.net/500/400?id=3',
    bio: 'Fetch addict. Has two modes: zoomies or snoozing. Loyal AF.',
    link: "https://www.petfinder.com/"
  },
]
const backgroundImg = "https://images.squarespace-cdn.com/content/v1/5e950775bee93b4c91e3d327/5752df7c-0739-4192-abb1-8a18da95a64d/Website+Background.png"
const formatAge = (age: number) => `${age} yr${age === 1 ? "" : "s"}`

//add argument to this
export function OutputCarousel() {
  return (
    <div className="flex justify-center items-center min-h-screen" >
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#e2cf79",
        }}
      />

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20 px-4">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          Find you new next best friend
        </h1>
      </div>
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {pets.map((pet) => (
            <CarouselItem key={pet.id} className="p-2">
              <a href={pet.link} target="_blank" rel="noopener noreferrer">
                <Card className="rounded-[28px] overflow-hidden shadow-lg border-0 bg-background bg-blue-100" >
                  <div className="h-56 w-full">
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      className="h-full w-full object-cover"
                    />
                  </div>


                  <div className="px-6 py-6 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">{pet.name}</h3>

                    <p className="mt-2 text-muted-foreground">
                      {formatAge(pet.age)} <span className="px-2">•</span> {pet.distance}
                    </p>

                    <p className="mt-6 text-base leading-relaxed">
                      {pet.bio}
                    </p>
                  </div>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

  )
}


