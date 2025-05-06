import { CarCard, CustomFilter, Hero, ShowMore } from '@/components'
import Image from 'next/image'
import { SearchBar } from '@/components'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants'
import { HomeProps } from '@/types'

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams

  const allCars = await fetchCars({
    manufacturer: sp.manufacturer || '',
    year: sp.year || 2022,
    fuel: sp.fuel || '',
    limit: sp.limit || 10,
    model: sp.model || '',
  })

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

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
              {allCars?.map((car) => (
                <CarCard key={car.id || car.model} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(sp.limit || 10) / 10}
              isNext={(sp.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
