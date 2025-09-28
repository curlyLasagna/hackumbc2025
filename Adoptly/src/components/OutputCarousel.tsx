import {
  Card,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Animal } from "@/types/Animal"

const backgroundImg = "https://images.squarespace-cdn.com/content/v1/5e950775bee93b4c91e3d327/5752df7c-0739-4192-abb1-8a18da95a64d/Website+Background.png"

export function OutputCarousel(animals) {
  // console.log("output carousel prop type:", typeof (animals));
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
      </div>
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {animals.map((animal) => (
            <CarouselItem key={animal.id} className="p-2">
              <a href={animal.url} target="_blank" rel="noopener noreferrer">
                <Card className="rounded-[28px] overflow-hidden shadow-lg border-0 bg-blue-100" >
                  <div className="h-56 w-full">
                    <img
                      src={
                        animal.photos?.[0]?.large ||
                        animal.photos?.[0]?.medium ||
                        animal.photos?.[0]?.full ||
                        "https://placedog.net/500/400?id=default"
                      }
                      alt={animal.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-6 py-6 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">{animal.name}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {animal.age} <span className="px-2">•</span> {typeof animal.distance === "number" ? `${animal.distance.toFixed(1)} miles away` : animal.distance}
                    </p>
                    <p className="mt-6 text-base leading-relaxed">
                      {animal.description}
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
