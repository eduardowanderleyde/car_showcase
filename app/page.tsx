import { CarCard, CustomFilter, Hero, ShowMore, SearchBar } from '@/components'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants'

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams; // necessário devido à Promise

  const allCars = await fetchCars({
    manufacturer: sp.manufacturer?.toString() || '',
    year: Number(sp.year) || 2022,
    fuel: sp.fuel?.toString() || '',
    limit: Number(sp.limit) || 10,
    model: sp.model?.toString() || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car) => (
                <CarCard key={`${car.make}-${car.model}-${car.year}`} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={Number(sp.limit || 10) / 10}
              isNext={(Number(sp.limit || 10)) <= allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>No cars found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
