import { CarProps, FilterProps } from "@/types";

// export async function fetchCars(filters: FilterProps) {
//   const { manufacturer, year, model, limit, fuel } = filters;

//   const headers = {
//     'X-RapidAPI-Key': '17bc706c34mshf75d24e2440491fp10f6d0jsnd34ea4d41c81',
//     'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
//   };

//   const params = new URLSearchParams();
//   if (manufacturer) params.append('make', manufacturer);
//   if (year) params.append('year', String(year));
//   if (model) params.append('model', model);
//   if (limit) params.append('limit', String(limit));
//   if (fuel) params.append('fuel_type', fuel);

//   const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${params.toString()}`, {
//     headers
//   });

//   const result = await response.json();
//   return result;
// }
export async function fetchCars(filters: FilterProps) {
  return [
    {
      city_mpg: 22,
      class: "compact car",
      combination_mpg: 25,
      cylinders: 4,
      displacement: 2.0,
      drive: "fwd",
      fuel_type: "gas",
      highway_mpg: 30,
      make: "Ford",
      model: "Mustang",
      transmission: "a",
      year: 2020,
    },
  ];
}


export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
}
